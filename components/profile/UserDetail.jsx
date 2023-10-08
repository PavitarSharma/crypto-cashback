"use client";

import { UserState, updateUser } from "@/redux/reducers/userSlice";
import {
  Avatar,
  Box,
  FormGroup,
  FormLabel,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import MuiButton from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import RHFTextFiled from "../inputs/RHFTextFiled";
import Button from "../Button";
import { MdCloudUpload } from "react-icons/md";
import UpdatePassword from "./UpdatePassword";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Must be 2 chracters or more")
    .max(50, "Must be 50 chracters or less"),
  lastName: Yup.string()
    .min(2, "Must be 2 chracters or more")
    .max(50, "Must be 50 chracters or less"),
  email: Yup.string().email("Email is Invalid"),
  mobile: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Too short")
    .max(15, "Too long"),
});

const UserDetail = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(UserState);
  const [imgSrc, setImgSrc] = useState();
  const [file, setFile] = useState();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onImageUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setImgSrc(URL.createObjectURL(file));
  };

  const onSubmit = async (values) => {
    const { firstName, lastName, email, mobile } = values;
    const body = {
      firstName,
      lastName,
      email,
      mobile: mobile ? +mobile : null,
    };
    console.log(body);

    await dispatch(updateUser({ id: user?._id, data: body })).unwrap();
    toast.success("User updated.");
  };

  return (
    <>
      <Stack marginBottom={6} marginTop={4}>
        <Avatar
          alt="avatar"
          src={imgSrc ? imgSrc : ""}
          sx={{ width: "150px", height: "150px" }}
        />
        <Box marginTop={2}>
          <MuiButton
            component="label"
            variant="outlined"
            sx={{ width: "160px", marginLeft: "4px", color: "black" }}
            startIcon={<MdCloudUpload />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              name="avatar"
              onChange={onImageUpload}
              accept="image/*"
            />
          </MuiButton>
        </Box>
      </Stack>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <FormGroup>
            <FormLabel>First Name</FormLabel>
            <RHFTextFiled name="firstName" id="firstName" control={control} />
          </FormGroup>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormGroup>
            <FormLabel>Last Name</FormLabel>
            <RHFTextFiled name="lastName" id="lastName" control={control} />
          </FormGroup>
        </Grid>
        <Grid item md={6} xs={12}>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <RHFTextFiled name="email" id="email" control={control} />
          </FormGroup>
        </Grid>

        <Grid item md={6} xs={12}>
          <FormGroup>
            <FormLabel>Mobile</FormLabel>
            <RHFTextFiled name="mobile" id="mobile" control={control} />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Button
              onClick={handleSubmit(onSubmit)}
              size="large"
              title="Save Changes"
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography fontSize={24} fontWeight={700} marginTop={8}>
            Update your password.
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <UpdatePassword />
        </Grid>
      </Grid>
    </>
  );
};

export default UserDetail;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
