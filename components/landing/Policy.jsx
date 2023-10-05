import { Box, Typography } from "@mui/material";

const Policy = () => {
  return (
    <Box marginTop="80px" marginBottom="40px">
      <Typography
        fontStyle="italic"
        textAlign="center"
        fontSize={32}
        fontWeight={700}
      >
        Our Policy
      </Typography>
      <Typography
        fontSize={18}
        color="rgba(0, 0, 0, 0.87)"
        marginTop={1}
        marginBottom={6}
        textAlign="center"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sequi
        illum, fugiat optio fuga itaque adipisci. Odio facere tempora expedita.
      </Typography>
    </Box>
  );
};

export default Policy;
