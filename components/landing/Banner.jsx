"use client";

import { BannerContainer } from "@/styles/LandingPage";
import { Box, Typography } from "@mui/material";
import Button from "../Button";
import { HiArrowLongRight } from "react-icons/hi2";

const Banner = ({ mobScreen }) => {
  return (
    <>
      <BannerContainer gap="20px" flexDirection={mobScreen ? "column" : "row"}>
        <Box textAlign={mobScreen && "center"}>
          <Typography fontSize={mobScreen ? 28 : 36}>
            Recieve free bitcoins with your online purchases.
          </Typography>
          <Typography fontSize={20} margin="10px 0">
            Shop at your favourite stores and receive your cashback in bitcoins!
          </Typography>
          <Button
            size="large"
            title="Start Today"
            endIcon={<HiArrowLongRight />}
          />
        </Box>

        <Box marginTop={mobScreen && 2} width={mobScreen ? "100%" : "50%"}>
          <img
            src="/images/banner2.png"
            alt="banner"
            width="100%"
            height="100%"
          />
        </Box>
      </BannerContainer>
    </>
  );
};

export default Banner;
