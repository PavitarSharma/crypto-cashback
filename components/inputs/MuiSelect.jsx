"use client";

import { FormControl, MenuItem, Select } from "@mui/material";

const MuiSelect = ({value, handleChange, label}) => {
  return (
    <FormControl>
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">{label}</MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default MuiSelect;
