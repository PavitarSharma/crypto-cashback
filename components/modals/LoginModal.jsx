"use client";

import { Grid, Paper, Typography } from "@mui/material";
import Modal from "../Modal";
import RHFTextFiled from "../inputs/RHFTextFiled";
import { useForm } from "react-hook-form";
import RHFPasswordInput from "../inputs/RHFPasswordInput";
import Button from "../Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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
  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (values) => {
    console.log(values);
    reset();
  };

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
        </Grid>

        <Grid item xs={12}>
          <Button
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
        onClick={handleOpenSignupModal}
        sx={{ textDecoration: "underline", cursor: "pointer" }}
      >
        Don't have account? Create here
      </Typography>
    </Paper>
  );
  return <Modal width={600} open={open} setOpen={setOpen} body={body} />;
};

export default LoginModal;
