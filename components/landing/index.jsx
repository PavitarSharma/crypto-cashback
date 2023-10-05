"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import Banner from "./Banner";
import WalletInfo from "./WalletInfo";
import Service from "./Service";
import Team from "./Team";
import Policy from "./Policy";

const Landing = () => {
  const theme = useTheme();
  const mobScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box padding={2}>
      <Banner mobScreen={mobScreen} />
      <WalletInfo mobScreen={mobScreen} />
      <Service mobScreen={mobScreen} />
      <Team />
      <Policy />
    </Box>
  );
};

export default Landing;
