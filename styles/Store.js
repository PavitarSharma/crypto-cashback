import { Box, styled } from "@mui/material";
import { Colors } from "./theme/theme";

export const TopHeader = styled(Box)(() => ({
  backgroundColor: "#f1f1f1",
  padding: "15px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "40px"
}));

export const LeftFilterHeader = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: "10px"
}))

export const CategorySelect = styled("select")(() => ({
    border: `1px solid ${Colors.dove_gray}`,
    padding: "0 30px",
    height: "40px",
    textAlign: "center",
    backgroundColor:  Colors.white,
    fontSize: 14,
    color: "#495057",
    width: "100%",
    position: "relative",
    outline: "none",
    "&:focus": {
        outline: `1px solid ${Colors.warning}`
    }
}))


