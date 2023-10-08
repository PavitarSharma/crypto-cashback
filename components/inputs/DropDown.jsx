"use client";

import { FormControl, MenuItem, Select } from "@mui/material";

const DropDown = ({
  label,
  value,
  width,
  size = "small",
  onChange,
  ...rest
}) => {
  return (
    <FormControl sx={{ minWidth: width ? width : 150 }}>
      <Select
        {...rest}
        size={size}
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">All Category</MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DropDown;
