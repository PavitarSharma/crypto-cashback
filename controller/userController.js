import asyncHandler from "express-async-handler";
import userService from "../services/user.service.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendMail from "../utils/sendMail.js";
import { otpTemplate } from "../templates/otpTemplate.js";
import tokenService from "../services/token.service.js";

// Create a new User
export const signUpUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, termsCheck } = req.body;

  if (!firstName || !lastName || !email || !password || !termsCheck) {
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

    try {
      await userService.senByMail({ email, otp });
      res.json({
        otp,
        email,
        hash: `${hash}.${expires}`,
        message: `Your account is not verified. Please verify your account before login.`,
      });
    } catch (error) {
      res.status(500).json({ message: "Message sending failed." });
    }
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
  const { accessToken, refreshToken } = await tokenService.generateTokens({
    _id: user._id,
    email: user.email,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  res.status(200).json({
    accessToken,
    user: userDetail,
  });
});

// Forgot Password
export const forgotPassword = asyncHandler(async (req, res, next) => {});

// Reset Password
export const resetPassword = asyncHandler(async (req, res, next) => {});

// Update Password
export const updatePassword = asyncHandler(async (req, res, next) => {});

// Edit User
export const updateUser = asyncHandler(async (req, res, next) => {});

// Log out User
export const logoutUser = asyncHandler(async (req, res, next) => {});

// Delete User
export const deleteUser = asyncHandler(async (req, res, next) => {});
