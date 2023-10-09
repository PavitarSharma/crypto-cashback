"use client";

import { Box, Grid, Paper, Typography } from "@mui/material";
import Modal from "../Modal";
import RHFTextFiled from "../inputs/RHFTextFiled";
import { useForm } from "react-hook-form";
import RHFPasswordInput from "../inputs/RHFPasswordInput";
import Button from "../Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback } from "react";
import useForgotPasswordModal from "@/hooks/useForgotPasswordModal";
import { AuthState, addOtpData, login } from "@/redux/reducers/authSlice";
import useOtpModal from "@/hooks/useOtpModal";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is Invalid").required("Email is required!"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password should contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
    )
    .required("Passowrd is required!"),
});

const LoginModal = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(AuthState);
  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const forgotPasswordModal = useForgotPasswordModal();
  const otpModal = useOtpModal();

  const toogleOtpModal = useCallback(() => {
    loginModal.onClose();
    otpModal.onOpen();
  }, [otpModal, loginModal]);

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(login(values)).unwrap();
      toast.success("Log in successfully.");
      loginModal.onClose();
      reset();
    } catch (error) {
      console.log("Error Message: ", error);
      const data = error.response.data;

      if (
        data?.message ===
        "Your account is not verified.We send you otp in your mail.Please verify your account before login."
      ) {
        dispatch(addOtpData(data));
        setTimeout(() => {
          toogleOtpModal();
        }, 2000);
        reset();
      }
    }
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const onToggleForgotPassword = useCallback(() => {
    loginModal.onClose();
    forgotPasswordModal.onOpen();
  }, [loginModal, forgotPasswordModal]);

  const body = (
    <Paper component="form" elevation={0} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RHFTextFiled
            type="email"
            label="Email"
            id="email"
            name="email"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFPasswordInput
            label="Password"
            id="password"
            name="password"
            control={control}
          />

          <Box display="flex" justifyContent="flex-end" marginTop={1}>
            <Typography
              onClick={onToggleForgotPassword}
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Forgot Password?
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Button
            disabled={status === "loading"}
            type="submit"
            size="large"
            title="Log In"
            sx={{ width: "100%" }}
          />
        </Grid>
      </Grid>

      <Typography
        textAlign="center"
        marginTop={2}
        onClick={onToggle}
        sx={{ textDecoration: "underline", cursor: "pointer" }}
      >
        Don't have account? Create here
      </Typography>
    </Paper>
  );
  return (
    <Modal
      width={600}
      open={loginModal.isOpen}
      onClose={loginModal.onClose}
      body={body}
    />
  );
};

export default LoginModal;
