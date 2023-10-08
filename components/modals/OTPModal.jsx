"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
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

const validationSchema = Yup.object({
  email: Yup.string().email("Email is Invalid").required("Email is required!"),
});

const OTPModal = ({ handleOpenLoginModal, open, setOpen }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [isResend, setIsResend] = useState(false);
  const otpModal = useOtpModal();
  const loginModal = useLoginModal();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const toggleLoginModal = useCallback(() => {
    loginModal.onOpen()
    otpModal.onClose()
  }, [loginModal, otpModal])

  const handleVerifyOtp = async () => {
    const body = {
      otp: +otp,
      email: otpData.email,
      hash: otpData.hash,
    };
    // try {
    //   const data = await verifyOtp(body).unwrap();
    //   toast.success(data.message);
    //   dispatch(removeOtpData());
    //   toggleLoginModal();
    //   setOtp("")
    // } catch (error) {
    //   console.log(error);
    //   toast.error(error.data.message);
    // }
  };

  const toggleIsResend = useCallback(() => setIsResend((state) => !state));

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
                  sx={{ width: "100%" }}
                  // onClick={handleSubmit(onSubmit)}
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
