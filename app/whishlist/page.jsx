"use client";

import { Colors } from "@/styles/theme/theme";
import { Box, Typography } from "@mui/material";

const WishList = () => {
  return (
    <Box padding={2}>
      <Typography textAlign="center" fontSize={38} fontWeight={700}>
        Whishlist
      </Typography>

      <Box
        bgcolor={Colors.lightRed}
        color="#721c24"
        border={`1px solid ${Colors.lightBorderRed}`}
        borderRadius={1}
        padding="12px"
        marginTop={14}
      >
        Wishlist is empty!
      </Box>
    </Box>
  );
};

export default WishList;
