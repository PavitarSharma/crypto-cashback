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
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "@/redux/reducers/authSlice";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is Invalid").required("Email is required!"),
});

const ForgotPasswordModal = () => {
  const dispatch = useDispatch();
  const loginModal = useLoginModal();
  const forgotPasswordModal = useForgotPasswordModal();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    if (message) setMessage("");
    await dispatch(forgotPassword({ email: values.email })).unwrap();
    setIsLoading(false);
    setMessage(values.email);
    reset();
    setTimeout(() => {
      forgotPasswordModal.onClose();
    }, 2000);
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
        {message && (
          <Typography
            fontSize={14}
            marginTop="2px"
            fontWeight={500}
            padding="0 2px"
            color="#222"
            variant="p"
            marginBottom={2}
            sx={{ opacity: 0.6 }}
          >
            Email send to
            <Typography
              fontWeight={600}
              color="black"
              variant="span"
              marginLeft="4px"
              marginRight="4px"
            >
              {message}
            </Typography>
            successfuly for reset your password.
          </Typography>
        )}

        <Box marginTop={1} width="100%">
          <Button
            disabled={isLoading}
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
