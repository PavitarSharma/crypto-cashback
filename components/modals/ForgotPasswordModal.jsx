"use client";

import useForgotPasswordModal from "@/hooks/useForgotPasswordModal";
import useLoginModal from "@/hooks/useLoginModal";
import RHFTextFiled from "../inputs/RHFTextFiled";
import Modal from "../Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useCallback } from "react";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is Invalid").required("Email is required!"),
});

const ForgotPasswordModal = () => {
  const loginModal = useLoginModal();
  const forgotPasswordModal = useForgotPasswordModal();

  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values) => {
    console.log(values);
  };

  const onLoginToggle = useCallback(() => {
    loginModal.onOpen();
    forgotPasswordModal.onClose();
  }, [loginModal, forgotPasswordModal]);

  const body = (
    <>
      <Typography
        textAlign="center"
        color="#111"
        fontSize={20}
        marginBottom={4}
        fontWeight={600}
      >
        Enter your email to reset your password.
      </Typography>
      <Stack>
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
            onClick={handleSubmit(onSubmit)}
            size="large"
            title="Reset My Password"
          />
        </Box>

        <Typography
          marginTop={2}
          fontSize={18}
          textAlign="center"
          onClick={onLoginToggle}
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Login here
        </Typography>
      </Stack>
    </>
  );

  return (
    <Modal
      open={forgotPasswordModal.isOpen}
      onClose={forgotPasswordModal.onClose}
      body={body}
    />
  );
};

export default ForgotPasswordModal;
