"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import AppbarMobile from "./appbarMobile";
import AppbarDesktop from "./appbarDesktop";
import { useEffect, useState } from "react";

const Navbar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [backgroundColor, setBackgroundColor] = useState(false);

  useEffect(() => {
    //navbar scroll changeBackground function
    const handleBackgroundColor = () => {
      if (window.scrollY > 80) {
        setBackgroundColor(true);
      } else {
        setBackgroundColor(false);
      }
    };

    window.addEventListener("scroll", handleBackgroundColor);

    return () => window.removeEventListener("scroll", handleBackgroundColor);
  });

  return (
    <>
      {matches ? (
        <AppbarMobile matches={matches} navbarColor={backgroundColor} />
      ) : (
        <AppbarDesktop navbarColor={backgroundColor} matches={matches} />
      )}
    </>
  );
};

export default Navbar;
