"use client";

import { FormHelperText, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const RHFTextField = (props) => {
  const { type = "text", control, name, label, id } = props;

  return (
    <Controller
      name={name}
      rules={{ required: `${label} is required.` }}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <TextField
            fullWidth
            type={type}
            id={id}
            label={label}
            value={value ? value : ""}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            error={!!error}
          />
          {error ? (
            <FormHelperText sx={{ color: "#d32f2f" }}>
              {error?.message}
            </FormHelperText>
          ) : null}
        </>
      )}
    />
  );
};

export default RHFTextField;
