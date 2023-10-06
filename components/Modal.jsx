"use client";
import { Backdrop, Box, Fade, IconButton } from "@mui/material";
import MuiModal from "@mui/material/Modal";
import { MdClose } from "react-icons/md";

const Modal = ({ open, onClose, body, width = 550 }) => {
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
      onClose={onClose}
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
              onClick={onClose}
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
