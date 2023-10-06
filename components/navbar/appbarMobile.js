import useAppState from "@/hooks/useAppState";
import { AppbarContainer, AppbarHeader } from "@/styles/Appbar";
import { Box, IconButton, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import Drawer from "./Drawer";
import Button from "../Button";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

const AppbarMobile = ({ matches }) => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const user = false;
  return (
    <>
      <AppbarContainer>
        {user && (
          <IconButton onClick={() => setOpenDrawer((prev) => !prev)}>
            <MdMenu />
          </IconButton>
        )}

        <Box>
          <AppbarHeader>Crypto</AppbarHeader>
        </Box>

        {user ? (
          <IconButton
            onClick={() => router.push("/profile")}
            sx={{ color: "black", cursor: "pointer", marginTop: "3px" }}
          >
            <IoMdPerson size={22} />
          </IconButton>
        ) : (
          <Stack direction="row" gap="10px">
            <Button title="Login" onClick={loginModal.onOpen} />
            <Button
              onClick={registerModal.onOpen}
              variant="outlined"
              title="Sign Up"
              sx={{ color: "black" }}
            />
          </Stack>
        )}
      </AppbarContainer>

      <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default AppbarMobile;
