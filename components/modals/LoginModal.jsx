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
import { useLoginMutation } from "@/redux/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentails } from "@/redux/auth/authSlice";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback } from "react";
import useForgotPasswordModal from "@/hooks/useForgotPasswordModal";

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

const LoginModal = ({ open, setOpen, handleOpenSignupModal }) => {
  const dispatch = useDispatch();
  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const forgotPasswordModal = useForgotPasswordModal();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (values) => {
    try {
      const response = await login(values).unwrap();

      if (
        response?.message ===
        "Your account is not verified. Please verify your account before login."
      ) {
        setOpenOtpModal(true);
      } else {
        console.log(response);
        dispatch(setCredentails(response));
        toast.success("Log in successfully.");
      }

      // reset();
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
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
            disabled={isLoading}
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
