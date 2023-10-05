import { Box, IconButton, List, Typography } from "@mui/material";
import { styled } from "@mui/material";
import Link from "next/link";
import { Colors, DrawerWidth } from "./theme/theme";

export const AppbarContainer = styled(Box)(({ navbarstyle }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 8px",
  marginTop: 4,
  position: "sticky",
  top: 0,
  background: "white",
  zIndex: 1000,
  boxShadow: navbarstyle && "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
}));

export const AppbarHeader = styled(Box)(() => ({
  padding: "4px",
  flexGrow: 1,
  fontSize: "2em",
}));

export const MyList = styled(List)(({ type, gap }) => ({
  display: type === "row" ? "flex" : "block",
  //   flexGrow: 1,
  gap: gap ? "20px" : "0px",
  justifyContent: "center",
  alignItems: "center",
}));

export const ActionIconsContainerMobile = styled(Box)(() => ({
  display: "flex",
  background: Colors.shaft,
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  alignItems: "center",
  zIndex: 99,
  borderTop: `1px solid ${Colors.border}`,
}));

export const ActionIconsContainerDesktop = styled(Box)(() => ({
  flexGrow: 0,
}));

export const AppbarLink = styled(Link)(({ activepath }) => ({
  color: activepath ? Colors.primary : "black",
  fontWeight: activepath ? 700 : 500,
}));

export const DrawerCloseButton = styled(IconButton)(() => ({
  position: "absolute",
  top: 10,
  left: DrawerWidth,
  zIndex: 1999,
  color: "white",
}));
