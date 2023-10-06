import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required!"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required!"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email."],
      trim: true,
    },

    mobile: {
      type: Number,
      // unique: true,
      default: null,
    },

    avatar: {
      id: String,
      url: String,
    },

    role: {
      type: String,
      default: "user",
    },

    password: {
      type: String,
      required: [true, "Password is required!"],
      trim: true,
    },

    address: {
      country: {
        type: String,
        trin: true,
      },

      state: {
        type: String,
        trin: true,
      },

      city: {
        type: String,
        trin: true,
      },

      pinCode: {
        type: String,
        trin: true,
      },
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    termsCheck: {
      type: Boolean,
      default: false
    },

    resetPasswordToken: String,
    resetPasswordTime: Date,
    verifyEmailTime: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
