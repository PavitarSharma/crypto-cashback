"use client";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useCallback, useState } from "react";
import { Controller } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const RHFPasswordInput = ({ control, name, id, label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = useCallback(
    () => setShowPassword((show) => !show),
    []
  );

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "Password is required!" }}
      render={({
        field: { value, onChange, ...restField },
        fieldState: { error },
      }) => {
        return (
          <FormControl fullWidth variant="outlined">
            <InputLabel
              htmlFor={id}
              sx={{
                color: error ? "#F44336" : "#666",
                "&.Mui-focused": {
                  color: error
                    ? "#F44336"
                    : (theme) => theme.palette.primary.main,
                },
              }}
            >
              {label}
            </InputLabel>
            <OutlinedInput
              id={id}
              value={value ? value : ""}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              {...restField}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <MdVisibilityOff size={22} color="#666" />
                    ) : (
                      <MdVisibility size={22} color="#666" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label={label}
              error={!!error}
            />
            {error ? (
              <FormHelperText
                sx={{
                  color: "#F44336",
                  marginLeft: "10px",
                  fontSize: "13px",
                }}
              >
                {error.message}
              </FormHelperText>
            ) : null}
          </FormControl>
        );
      }}
    />
  );
};

export default RHFPasswordInput;
