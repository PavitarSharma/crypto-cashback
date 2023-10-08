import { Colors } from "@/styles/theme/theme";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  const date = new Date();
  return (
    <Box
      bgcolor={Colors.black}
      color={Colors.white}
      textAlign="center"
      height="100px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography>&#169; {date.getFullYear()}. All Rights Reserved</Typography>
    </Box>
  );
};

export default Footer;
