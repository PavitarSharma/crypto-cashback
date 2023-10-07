import express from "express";
import {
  allUsers,
  deleteUser,
  forgotPassword,
  loginUser,
  logoutUser,
  refreshTokenUser,
  resendOtp,
  resetPassword,
  signUpUser,
  updatePassword,
  updateUser,
  uploadUserProfilePicture,
  userDetail,
  verifyOtp,
} from "../controller/userController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signUp", signUpUser);

router.post("/verify-otp", verifyOtp);

router.post("/resend-otp", resendOtp);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.get("/refresh", refreshTokenUser);

// Auth Routes

router.post("/update-password", auth, updatePassword);

router.get("/", auth, allUsers);

router.get("/:id", auth, userDetail);

router.patch("/:id", auth, updateUser);

router.post("/:id/avatar", auth, uploadUserProfilePicture);

router.post("/logout", auth, logoutUser);

router.delete("/:id", auth, deleteUser);

export default router;
