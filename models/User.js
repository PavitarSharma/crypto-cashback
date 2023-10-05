import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name id required!"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last name id required!"],
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
      unique: true,
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
