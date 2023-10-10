import asyncHandler from "express-async-handler";
import userService from "../services/user.service.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendMail from "../utils/sendMail.js";
import { otpTemplate } from "../templates/otpTemplate.js";
import tokenService from "../services/token.service.js";
import { forgotPasswordEmailTemplate } from "../templates/forgotPasswordEmailTemplate.js";
import User from "../models/User.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// Create a new User
export const signUpUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, termsCheck, mobile } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return next(new ErrorHandler(400, "All fields are required!"));
  }

  // Hash The Password
  const hashPassword = await userService.hashPassword(password);
  const otp = await userService.generateOtp();

  const user = {
    firstName,
    lastName,
    email,
    password: hashPassword,
    termsCheck,
    mobile,
  };

  //   Hash OTP
  const ttl = 1000 * 60 * 5; // 5 minutes
  const expires = Date.now() + ttl;
  const data = `${email}.${otp}.${expires}`;
  const hash = userService.hashOtp(data);

  // Create a new user
  await userService.createUser(user);

  // Send mail with OTP
  try {
    await userService.senByMail({ email, otp });
    res.status(201).json({
      otp,
      email,
      hash: `${hash}.${expires}`,
      message: `A verification mail to send with your email ${email}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Message sending failed." });
  }
});

// Verify Otp
export const verifyOtp = asyncHandler(async (req, res, next) => {
  const { otp, hash, email } = req.body;

  if (!otp || !hash || !email) {
    return next(new ErrorHandler(400, "All fields are required!"));
  }

  const [hashOtp, expires] = hash.split(".");

  if (Date.now() > +expires) {
    return next(new ErrorHandler(400, "OTP expired!"));
  }

  const data = `${email}.${otp}.${expires}`;

  const isValid = userService.verifyOtp(hashOtp, data);

  if (!isValid) return next(new ErrorHandler(400, "Invalid OTP"));

  const user = await userService.findUser({
    email,
    message: "User not exist.Please sign up to verify your account.",
  });

  user.isVerified = true;
  await user.save();

  const userDetail = userService.getUserDetail(user);

  res.json({ user: userDetail, message: "OTP verified." });
});

// Resend OTP
export const resendOtp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email)
    return next(
      new ErrorHandler(400, "Please write your mail to send the otp.")
    );

  const otp = await userService.generateOtp();
  const ttl = 1000 * 60 * 5; // 5 minutes
  const expires = Date.now() + ttl;
  const data = `${email}.${otp}.${expires}`;
  const hash = userService.hashOtp(data);

  try {
    await userService.senByMail({ email, otp });
    res.json({
      otp,
      email,
      hash: `${hash}.${expires}`,
      message: `A verification mail to send with your email ${email}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Message sending failed." });
  }
});

// Login User
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, "All fields are required!"));
  }

  const user = await userService.findUser({
    email,
    message: "Invalid credentials",
  });

  if (!user.isVerified) {
    const otp = await userService.generateOtp();
    const ttl = 1000 * 60 * 5; // 5 minutes
    const expires = Date.now() + ttl;
    const data = `${email}.${otp}.${expires}`;
    const hash = userService.hashOtp(data);

    await userService.senByMail({ email, otp });
    res.status(400).json({
      otp,
      email,
      hash: `${hash}.${expires}`,
      message: `Your account is not verified.We send you otp in your mail.Please verify your account before login.`,
    });
  }

  const validPassword = await userService.comparePassword(
    user.password,
    password
  );

  if (!validPassword) {
    return next(new ErrorHandler(400, "Invalid credentials"));
  }

  const userDetail = userService.getUserDetail(user);

  //Token
  const { accessToken } = await tokenService.generateTokens({
    _id: user._id,
    email: user.email,
    role: user.role,
  });

  res.status(200).json({
    accessToken,
    user: userDetail,
  });
});

// Forgot Password
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email)
    return next(
      new ErrorHandler(400, "Please provide your mail to reset the password.")
    );

  const user = await userService.findUser({
    email,
    message: "User not found.",
  });

  const resetToken = user.getResetToken();

  await user.save({
    validateBeforeSave: false,
  });

  const resetPasswordUrl = `${process.env.CLIENT_URL}/resetPassword?token=${resetToken}`;

  const html = forgotPasswordEmailTemplate({
    name: `${user.firstName}`,
    productName: process.env.COMPANY_NAME,
    url: resetPasswordUrl,
    companyName: process.env.COMPANY_NAME,
  });

  await sendMail({
    email: user.email,
    html,
    subject: `${process.env.COMPANY_NAME}: Reset your password.`,
  });

  res.status(200).json({
    success: true,
    message: `Email sent to ${user.email} succesfully`,
  });
});

// Reset Password
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;
  const { token } = req.query;

  if (!newPassword || !confirmPassword) {
    return next(
      new ErrorHandler(
        400,
        "Please enter password and confirm password for your reset the paasword."
      )
    );
  }

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(400, "Reset password url is invalid or has been expired")
    );
  }

  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler(400, "Password not matched with each other"));
  }

  const hashPassword = await userService.hashPassword(newPassword);
  user.password = hashPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset done.",
  });
});

// Update Password
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;

  if (!newPassword || !confirmPassword) {
    return next(
      new ErrorHandler(
        400,
        "Please enter password and confirm password for your reset the paasword."
      )
    );
  }

  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler(400, "Password not matched with each other"));
  }

  const user = await userService.findUserWithId(req.user._id);

  const hashPassword = await userService.hashPassword(newPassword);
  user.password = hashPassword;

  user.save();

  res.status(200).json({
    success: true,
    message: "Password updated.",
  });
});

// Get All Users
export const allUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({}, { password: 0, __v: 0 }).sort({
    createdAt: -1,
  });
  res.status(200).json(users);
});

// Ger User Details
export const userDetail = asyncHandler(async (req, res, next) => {
  const foundUser = await userService.findUserWithId(req.params.id);
  const user = await userService.getUserDetail(foundUser);
  res.status(200).json(user);
});

// Edit User
export const updateUser = asyncHandler(async (req, res, next) => {
  const fileName = `${process.env.SERVER_URL}/${req.file.filename}`;
  const { firstName, lastName, email, mobile } = req.body;

  const body = {
    firstName,
    lastName,
    email,
    mobile,
    avatar: fileName ? fileName : "",
  };
  const user = await User.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidator: true,
  }).select("-password");

  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  res.status(200).json(user);
});

export const updateUserAddress = asyncHandler(async (req, res, next) => {
  const { country, currency, crypto, language } = req.body;

  const address = {
    country,
    currency,
    crypto,
    language,
  };

  const user = await userService.findUserWithId(req.params.id);

  user.address = address;
  await user.save();

  const userDetail = await userService.getUserDetail(user);

  res.status(200).json(userDetail);
});

// Delete User
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  res.status(200).json(user);
});
