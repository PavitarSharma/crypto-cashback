"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import Button from "../Button";
import { Colors } from "@/styles/theme/theme";
import RHFTextFiled from "../inputs/RHFTextFiled";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import useOtpModal from "@/hooks/useOtpModal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import useLoginModal from "@/hooks/useLoginModal";
import {
  AuthState,
  addOtpData,
  removeOtpData,
  resendOtp,
  verifyOtp,
} from "@/redux/reducers/authSlice";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is Invalid").required("Email is required!"),
});

const OTPModal = ({ handleOpenLoginModal, open, setOpen }) => {
  const dispatch = useDispatch();
  const { otpData } = useSelector(AuthState);
  const [otp, setOtp] = useState("");
  const [isResend, setIsResend] = useState(false);
  const otpModal = useOtpModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    // Reset the form when the modal is opened or isResend changes
    if (open || isResend) {
      reset();
    }
  }, [open, isResend, reset]);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const toggleLoginModal = useCallback(() => {
    loginModal.onOpen();
    otpModal.onClose();
  }, [loginModal, otpModal]);

  const handleVerifyOtp = async () => {
    const body = {
      otp: +otp,
      email: otpData.email,
      hash: otpData.hash,
    };

    const data = await dispatch(verifyOtp(body)).unwrap();
    toast.success(data.message);
    dispatch(removeOtpData());
    toggleLoginModal();
    setOtp("");
  };

  const handleResendOtp = async (values) => {
    setIsLoading(true);
    try {
      const data = await dispatch(resendOtp({ email: values.email })).unwrap();
      dispatch(addOtpData(data));
      reset();
    } catch (error) {
      toast.error(
        "Something went wroen when sending the OTP message. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleIsResend = useCallback(() => {
    setIsResend((state) => !state)
    reset()
  });

  const body = (
    <>
      <Box>
        <Typography fontSize={20} fontWeight={600} marginBottom={2}>
          Enter your OTP to verify your account
        </Typography>
        <MuiOtpInput
          length={6}
          value={otp}
          onChange={handleChange}
          TextFieldsProps={{ size: "small" }}
        />

        <Box
          marginTop={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            // disabled={isLoading}
            size="large"
            title="Verify Otp"
            onClick={handleVerifyOtp}
          />

          <Typography
            onClick={toggleIsResend}
            sx={{
              textDecoration: "underline",
              cursor: "pointer",
              "&:hover": {
                color: Colors.success,
              },
            }}
          >
            Resend OTP
          </Typography>
        </Box>

        {isResend ? (
          <>
            <Stack marginTop={3}>
              <RHFTextFiled
                type="email"
                label="Email"
                id="email"
                name="email"
                control={control}
              />

              <Box marginTop={1} width="100%">
                <Button
                  disabled={isLoading}
                  sx={{ width: "100%" }}
                  onClick={handleSubmit(handleResendOtp)}
                  size="large"
                  title="Send"
                />
              </Box>
            </Stack>
          </>
        ) : null}

        <Typography marginTop={2} fontSize={14} color={Colors.info}>
          Check your mail to get the OTP
        </Typography>
      </Box>
    </>
  );

  return (
    <Modal
      width={600}
      open={otpModal.isOpen}
      onClose={otpModal.onClose}
      body={body}
    />
  );
};

export default OTPModal;
