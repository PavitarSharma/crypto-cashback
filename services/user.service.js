import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";
import { otpTemplate } from "../templates/otpTemplate.js";
import sendMail from "../utils/sendMail.js";

class UserService {
  getUserDetail(user) {
    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar ? user.avatar : null,
      mobile: user.mobile ? user.mobile : null,
      isVerified: user.isVerified,
      termsCheck: user.termsCheck,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // Hash The Password
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(hashPassword, password) {
    console.log(hashPassword, password);
    return await bcrypt.compare(password, hashPassword);
  }

  async generateOtp() {
    const otp = crypto.randomInt(100000, 999999);
    return otp;
  }

  hashOtp(data) {
    const hash = crypto
      .createHmac("sha256", process.env.OTP_SECRET)
      .update(data)
      .digest("hex");

    return hash;
  }

  async senByMail({ email, otp }) {
    const otpions = {
      brand: process.env.COMPANY_NAME,
      otp,
    };

    const html = otpTemplate(otpions);
    const subject = `Your verification code`;
    return await sendMail({
      email,
      html,
      subject,
    });
  }

  verifyOtp(hashOtp, data) {
    let computedHash = this.hashOtp(data);

    return computedHash === hashOtp;
  }

  // Create User
  async createUser(data) {
    // Check for duplicate email
    const existingUserWithEmail = await User.findOne({ email: data.email });
    if (existingUserWithEmail) {
      throw new Error("User with this email already exists");
    }

    // Check for duplicate mobile
    if (data.mobile) {
      const existingUserWithMobile = await User.findOne({
        mobile: data.mobile,
      });
      if (existingUserWithMobile) {
        throw new Error("User with this mobile number already exists");
      }
    }

    // Create the new user
    const user = await User.create(data);

    return user;
  }

  async findUser({ email, message }) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(message);
    }

    return user;
  }

  async findUserWithId(id) {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

const userService = new UserService();

export default userService;