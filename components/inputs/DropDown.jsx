"use client";

import { FormControl, MenuItem, Select } from "@mui/material";

const DropDown = ({
  label,
  value,
  width,
  size = "small",
  onChange,
  options,
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
        <MenuItem value={label}>{label}</MenuItem>
        {options?.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
