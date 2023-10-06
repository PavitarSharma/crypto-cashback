import express from "express";
import {
  loginUser,
  resendOtp,
  signUpUser,
  verifyOtp,
} from "../controller/userController.js";

const router = express.Router();

router.post("/signUp", signUpUser);

router.post("/verify-otp", verifyOtp);

router.post("/resend-otp", resendOtp);

router.post("/login", loginUser);

export default router;
