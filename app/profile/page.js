"use client";

import Button from "@/components/Button";
import CountryCurrency from "@/components/profile/CountryCurrency";
import Notification from "@/components/profile/Notification";
import UserDetail from "@/components/profile/UserDetail";
import { AuthState } from "@/redux/reducers/authSlice";
import { UserState, getUser } from "@/redux/reducers/userSlice";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(UserState);
  const [active, setActive] = useState("Profile");

  const handleChangeActive = (type) => {
    setActive(type);
  };

  return (
    <Box padding={2}>
      <Stack direction="row" alignItems="center" gap="20px">
        <Button
          variant={active === "Profile" ? "contained" : "outlined"}
          title="Profile"
          onClick={() => handleChangeActive("Profile")}
          sx={{
            color: active === "Profile" ? "white" : "black",
          }}
        />
        <Button
          sx={{
            color: active === "Country/Currency" ? "white" : "black",
          }}
          variant={active === "Country/Currency" ? "contained" : "outlined"}
          title="Country/Currency"
          onClick={() => handleChangeActive("Country/Currency")}
        />
        <Button
          sx={{
            color: active === "Notifications" ? "white" : "black",
          }}
          variant={active === "Notifications" ? "contained" : "outlined"}
          title="Notifications"
          onClick={() => handleChangeActive("Notifications")}
        />
      </Stack>

      <Box marginTop={2}>
        {active === "Profile" && <UserDetail />}
        {active === "Country/Currency" && <CountryCurrency />}
        {active === "Notifications" && <Notification />}
      </Box>
    </Box>
  );
};

export default Profile;
