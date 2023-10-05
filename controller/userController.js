import asyncHandler from "express-async-handler";
import userService from "../services/user.service.js";

// Create a new User
export const addUser = asyncHandler(async (req, res, next) => {});

// Send OTP To User Email
export const sendOTP = asyncHandler(async (req, res, next) => {});

// Verify OTP and Create a User
export const verifyOTP = asyncHandler(async (req, res, next) => {});

// Login User
export const loginUser = asyncHandler(async (req, res, next) => {});

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
