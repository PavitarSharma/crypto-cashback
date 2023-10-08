"use client";

import { Colors } from "@/styles/theme/theme";
import { Box, InputBase, styled } from "@mui/material";
import { MdSearch } from "react-icons/md";

const Search = ({ placeholder }) => {
  return (
    <Box
      border={`1px solid ${Colors.dim_grey}`}
      position="relative"
      height="40px"
      maxWidth="500px"
      width="100%"
      paddingLeft="40px"
      borderRadius="4px"
    >
      <Box
        position="absolute"
        left="5px"
        top="50%"
        sx={{ transform: "translateY(-50%)" }}
      >
        <MdSearch color={Colors.dim_grey} size={24} />
      </Box>
      <Input type="text" placeholder={placeholder} />
    </Box>
  );
};

export default Search;

const Input = styled(InputBase)(() => ({
  outline: "none",
  border: "none",
  height: "100%",
  width: "100%",

}));
