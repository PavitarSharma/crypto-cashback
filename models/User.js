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
      default: null,
      unique: true
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
        trim: true,
      },

      state: {
        type: String,
        trim: true,
      },

      city: {
        type: String,
        trim: true,
      },

      pinCode: {
        type: String,
        trim: true,
      },
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    termsCheck: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: String,
    resetPasswordTime: Date,
    verifyEmailTime: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getResetToken = function () {
  // Generating token
  const resetToken = crypto.randomBytes(32).toString("hex");

  //    hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordTime = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
