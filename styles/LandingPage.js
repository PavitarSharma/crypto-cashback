import { Box, styled } from "@mui/material";
import { Colors } from "./theme/theme";

export const BannerContainer = styled(Box)(() => ({
  color: Colors.black,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 10,
}));

export const LeftArrowContainer = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "-14px",
  transform: "translateY(-50%)",
  backgroundColor: Colors.primary,
  color: Colors.white,
  width: "34px",
  height: "34px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  cursor: "pointer",
}));

export const RightArrowContainer = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  right: "-14px",
  transform: "translateY(-50%)",
  backgroundColor: Colors.primary,
  color: Colors.white,
  width: "34px",
  height: "34px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  cursor: "pointer",
}));

export const DotContainer = styled(Box)(() => ({
  border: `1px solid ${Colors.primary}`,
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  marginTop: 10,
}));


