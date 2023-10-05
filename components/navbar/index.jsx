"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import AppbarMobile from "./appbarMobile";
import AppbarDesktop from "./appbarDesktop";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";

const Navbar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
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

  const handleOpenLoginModal = useCallback(() => {
    setOpenLoginModal((state) => !state);
    setOpenSignupModal(false);
  }, []);

  const handleOpenSignupModal = useCallback(() => {
    setOpenSignupModal((state) => !state);
    setOpenLoginModal(false);
  }, []);

  return (
    <>
      {matches ? (
        <AppbarMobile
          handleOpenLoginModal={handleOpenLoginModal}
          matches={matches}
          handleOpenSignupModal={handleOpenSignupModal}
          navbarColor={backgroundColor}
        />
      ) : (
        <AppbarDesktop
          navbarColor={backgroundColor}
          handleOpenLoginModal={handleOpenLoginModal}
          matches={matches}
          handleOpenSignupModal={handleOpenSignupModal}
        />
      )}

      {openLoginModal ? (
        <LoginModal
          open={openLoginModal}
          setOpen={setOpenLoginModal}
          handleOpenSignupModal={handleOpenSignupModal}
        />
      ) : null}

      {openSignupModal ? (
        <SignupModal
          open={openSignupModal}
          setOpen={setOpenSignupModal}
          handleOpenLoginModal={handleOpenLoginModal}
        />
      ) : null}
    </>
  );
};

export default Navbar;
