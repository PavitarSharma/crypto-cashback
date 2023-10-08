"use client";

import Button from "@/components/Button";
import Landing from "@/components/landing";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "@/redux/reducers/authSlice";
import Store from "@/components/store/Store";
import { useEffect } from "react";
import { getUser } from "@/redux/reducers/userSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector(AuthState);

  useEffect(() => {
    dispatch(getUser(user?._id));
  }, [dispatch, user?._id]);

  return (
    <>
      <main>
        <Box padding={2}>{user ? <Store /> : <Landing />}</Box>
      </main>
    </>
  );
}
