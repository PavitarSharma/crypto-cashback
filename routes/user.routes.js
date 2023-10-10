import express from "express";
import {
  allUsers,
  deleteUser,
  forgotPassword,
  loginUser,
  resendOtp,
  resetPassword,
  signUpUser,
  updatePassword,
  updateUser,
  updateUserAddress,
  userDetail,
  verifyOtp,
} from "../controller/userController.js";
import { auth } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/signUp", signUpUser);

router.post("/verify-otp", verifyOtp);

router.post("/resend-otp", resendOtp);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

// Auth Routes

router.post("/update-password", auth, updatePassword);

router.get("/", auth, allUsers);

router.get("/:id", auth, userDetail);

router.post("/:id/update-user-info", auth, updateUserAddress);

router.patch("/:id", auth, upload.single("avatar"), updateUser);

router.delete("/:id", auth, deleteUser);

export default router;
