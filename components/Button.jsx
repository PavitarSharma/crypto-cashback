"use client"

import MuiButton from "@mui/material/Button";

const Button = ({ type, variant = "contained", title, onClick, ...rest }) => {
  return (
    <MuiButton type={type} onClick={onClick} variant={variant} {...rest}>
      {title}
    </MuiButton>
  );
};

export default Button;
