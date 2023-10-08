import { createTheme } from "@mui/material";
export const DrawerWidth = 250;
export const Colors = {
  primary: "#4CAF50",
  secondary: "#00AC97",
  success: "#4CAF50",
  info: "#00a2ff",
  danger: "#FF5722",
  warning: "#FFC107",
  dark: "#0e1b20",
  light: "#aaa",
  muted: "#abafb3",
  border: "#DDDFE1",
  inverse: "#2F3D4A",
  shaft: "#333",
  lightRed: "#f8d7da",
  lightBorderRed: "#f5c6cb",

  dim_grey: "#696969",
  dove_gray: "#d5d5d5",
  body_bg: "#f3f6f9",
  light_gray: "rgb(230,230,230)",

  white: "#fff",
  black: "#000",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          color: "white",
          textTransform: "capitalize",
        },
      },
    },
  },
});

export default theme;
