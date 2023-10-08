import useAppState from "@/hooks/useAppState";
import { AppbarContainer, AppbarHeader } from "@/styles/Appbar";
import { Box, IconButton, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { MdFavoriteBorder, MdMenu } from "react-icons/md";
import Drawer from "./Drawer";
import Button from "../Button";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useSelector } from "react-redux";
import { AuthState } from "@/redux/reducers/authSlice";
import { Colors } from "@/styles/theme/theme";
import Link from "next/link";

const AppbarMobile = ({ matches }) => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const { user } = useSelector(AuthState);

  return (
    <>
      <AppbarContainer>
        {user && (
          <IconButton onClick={() => setOpenDrawer((prev) => !prev)}>
            <MdMenu />
          </IconButton>
        )}

        <Box>
          <Link href="/" onClick={() => router.push("/")}>
            <AppbarHeader>Crypto</AppbarHeader>
          </Link>
        </Box>

        {user ? (
          <Stack direction="row" gap="10px" alignItems="center">
            <Box position="relative">
              <IconButton
                onClick={() => router.push("/whishlist")}
                sx={{ color: Colors.danger, cursor: "pointer" }}
              >
                <MdFavoriteBorder size={28} />
              </IconButton>
              <Box
                position="absolute"
                top="20px"
                right="0"
                bgcolor={Colors.dark}
                color={Colors.white}
                width="20px"
                height="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="50%"
                fontSize={14}
              >
                0
              </Box>
            </Box>
            <IconButton
              onClick={() => router.push("/profile")}
              sx={{ color: "black", cursor: "pointer", marginTop: "3px" }}
            >
              <IoMdPerson size={22} />
            </IconButton>
          </Stack>
        ) : (
          <Stack direction="row" gap="10px" alignItems="center">
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
