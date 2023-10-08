import { Box, FormGroup, FormLabel, Grid } from "@mui/material";
import React from "react";
import RHFPasswordInput from "../inputs/RHFPasswordInput";
import Button from "../Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUserPassword } from "@/redux/reducers/userSlice";
import toast from "react-hot-toast";

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

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(passwordValidation),
  });

  const onSubmit = async (values) => {
    await dispatch(updateUserPassword(values)).unwrap();
    toast.success("Password updated.");
    reset()
  };

  return (
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
        <Box>
          <Button
            onClick={handleSubmit(onSubmit)}
            size="large"
            title="Update Password"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default UpdatePassword;
