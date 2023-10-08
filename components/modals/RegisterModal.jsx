"use client";

import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Modal from "../Modal";
import RHFTextFiled from "../inputs/RHFTextFiled";
import { useForm } from "react-hook-form";
import RHFPasswordInput from "../inputs/RHFPasswordInput";
import Button from "../Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPModal from "./OTPModal";
import LoginModal from "./LoginModal";
import toast from "react-hot-toast";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import useOtpModal from "@/hooks/useOtpModal";
import { AuthState, signUp } from "@/redux/reducers/authSlice";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Must be 2 chracters or more")
    .max(50, "Must be 50 chracters or less")
    .required("First name is required!"),
  lastName: Yup.string()
    .min(2, "Must be 2 chracters or more")
    .max(50, "Must be 50 chracters or less")
    .required("First name is required!"),
  email: Yup.string().email("Email is Invalid").required("Email is required!"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password should contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
    )
    .required("Passowrd is required!"),
  termsCheck: Yup.boolean(),
});

const RegisterModal = () => {
  const dispatch = useDispatch();
  const {status} = useSelector(AuthState)
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const otpModal = useOtpModal();

  const {
    control,
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const captchaRef = useRef(null);

  const toggleOtpModal = useCallback(() => {
    otpModal.onOpen();
    registerModal.onClose();
  }, [otpModal, registerModal]);

  const onSubmit = async (values) => {
    // const token = captchaRef.current.getValue();
    // if (!token) {
    //   throw new Error("Please verify");
    // }

    const response = await dispatch(signUp(values)).unwrap();
    toggleOtpModal();
    toast.success(response.message);
  };

  const termsCheckboxLabel = (
    <Typography
      flex={1}
      variant="p"
      fontSize={13}
      fontWeight={500}
      color="#666"
    >
      I certify that I am over 18 years of age and accept the
      <Typography
        variant="span"
        margin="0 4px"
        sx={{ textDecoration: "underline", cursor: "pointer" }}
      >
        Privacy Policy
      </Typography>
      and the{" "}
      <Typography
        variant="span"
        sx={{ textDecoration: "underline", cursor: "pointer" }}
      >
        Terms & Conditions
      </Typography>
    </Typography>
  );

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const SignUpBody = (
    <>
      <Paper component="form" elevation={0} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <RHFTextFiled
              label="First Name"
              name="firstName"
              id="firstName"
              control={control}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <RHFTextFiled
              label="Last Name"
              id="lastName"
              name="lastName"
              control={control}
            />
          </Grid>
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
              label="Choose Password"
              id="password"
              name="password"
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox {...register("termsCheck")} defaultChecked />
                }
                label={termsCheckboxLabel}
              />
            </FormGroup>

            {/* <Box marginTop={2}>
            <ReCAPTCHA
              sitekey="6LeLBXcoAAAAAEc7PngK8zLsVlIb7LpdqM00HYhb"
              ref={captchaRef}
            />
          </Box> */}
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 1 }}>
            <Button
              disabled={status === "loading"}
              type="submit"
              size="large"
              title="Create Account"
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
          I already have an account{" "}
        </Typography>
      </Paper>
    </>
  );

  return (
    <Modal
      width={600}
      open={registerModal.isOpen}
      onClose={registerModal.onClose}
      body={SignUpBody}
    />
  );
};

export default RegisterModal;
