"use client";
import {
  Backdrop,
  Box,
  Fade,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MuiModal from "@mui/material/Modal";
import { useCallback } from "react";
import { MdClose } from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Modal = ({ open, setOpen, body, width = 550 }) => {
  const theme = useTheme();
  const mobScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClose = useCallback(() => setOpen(false), []);
  return (
    <MuiModal
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      closeAfterTransition
      keepMounted
      open={open}
      onClose={handleClose}
    >
      <Fade in={open}>
        <Box padding="20px">
          <Box
            position="absolute"
            top="50%"
            left="50%"
            boxShadow={24}
            py={4}
            px={2}
            maxWidth={width}
            width="100%"
            sx={{
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", top: 4, right: 8 }}
            >
              <MdClose color="#000" size={22} />
            </IconButton>

            <Box marginTop={2}>{body}</Box>
          </Box>
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
