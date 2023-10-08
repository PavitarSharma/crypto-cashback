"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import Banner from "./Banner";
import WalletInfo from "./WalletInfo";
import Service from "./Service";
import Team from "./Team";
import Policy from "./Policy";
import Footer from "../Footer";

const Landing = () => {
  const theme = useTheme();
  const mobScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Banner mobScreen={mobScreen} />
      <WalletInfo mobScreen={mobScreen} />
      <Service mobScreen={mobScreen} />
      <Team />
      <Policy />
      <Footer />
    </>
  );
};

export default Landing;
