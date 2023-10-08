"use client";

import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import {
  Box,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import RHFPasswordInput from "@/components/inputs/RHFPasswordInput";
import Button from "@/components/Button";
import { resetPassword } from "@/redux/reducers/authSlice";
import toast from "react-hot-toast";
import { useState } from "react";

const passwordValidation = Yup.object({
  newPassword: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password should contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
    )
    .required("Passowrd is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Password must match")
    .required("Confirm Passowrd is required!"),
});

const page = () => {
  const dispatch = useDispatch();
  const queryParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(passwordValidation),
  });

  const token = queryParams.get("token");

  const onSubmit = async (values) => {
    setIsLoading(true);
    const { newPassword, confirmPassword } = values;
    try {
      await dispatch(
        resetPassword({ newPassword, confirmPassword, token })
      ).unwrap();
      setIsLoading(false);
      toast.success("Password updated. You can login now.");
      reset();
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Paper sx={{ padding: "20px", maxWidth: "500px", width: "100%" }}>
          <Typography
            textAlign="center"
            fontSize={24}
            fontWeight={700}
            marginBottom={3}
          >
            Reset your Password
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormGroup>
                <FormLabel>New Password</FormLabel>
                <RHFPasswordInput
                  id="newPassword"
                  name="newPassword"
                  control={control}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormLabel>Confirm Password</FormLabel>
                <RHFPasswordInput
                  id="confirmPassword"
                  name="confirmPassword"
                  control={control}
                />
              </FormGroup>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isLoading}
                sx={{ width: "100%" }}
                onClick={handleSubmit(onSubmit)}
                size="large"
                title="Update Password"
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default page;
