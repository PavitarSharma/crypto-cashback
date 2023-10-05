"use client";

import theme from "@/styles/theme/theme";
import { Container, ThemeProvider } from "@mui/material";

const MuiThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters maxWidth="xl">
        {children}
      </Container>
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
