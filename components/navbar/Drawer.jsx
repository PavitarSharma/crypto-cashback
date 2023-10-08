import { AppbarLink, DrawerCloseButton, MyList } from "@/styles/Appbar";
import { Box, Divider, List, Stack, Typography, styled } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { MdClose } from "react-icons/md";
import Button from "../Button";
import { useSelector } from "react-redux";
import { AuthState } from "@/redux/reducers/authSlice";

const MiddleDivider = styled((props) => (
  <Divider sx={{ marginTop: 1, marginBottom: 1 }} variant="middle" {...props} />
))``;

const Drawer = ({ openDrawer, setOpenDrawer }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useSelector(AuthState);

  const handlePageChange = useCallback((path) => {
    router.push(path);
    setOpenDrawer(false);
  }, []);

  return (
    <>
      {openDrawer && (
        <DrawerCloseButton onClick={() => setOpenDrawer(false)}>
          <MdClose />
        </DrawerCloseButton>
      )}
      <MuiDrawer open={openDrawer}>
        <Stack width="250px" marginTop={2}>
          <AppbarLink
            href="/"
            onClick={() => handlePageChange("/")}
            {...(pathname === "/" ? { activepath: "true" } : {})}
          >
            <Typography variant="span" marginLeft={2}>
              Store
            </Typography>
          </AppbarLink>
          <MiddleDivider />
          <AppbarLink
            href="/wallet"
            onClick={() => handlePageChange("/wallet")}
            {...(pathname === "/wallet" ? { activepath: "true" } : {})}
          >
            <Typography variant="span" marginLeft={2}>
              Wallet
            </Typography>
          </AppbarLink>
          <MiddleDivider />
          <AppbarLink
            href="/transfers"
            onClick={() => handlePageChange("/transfers")}
            {...(pathname === "/transfers" ? { activepath: "true" } : {})}
          >
            <Typography variant="span" marginLeft={2}>
              Transfers
            </Typography>
          </AppbarLink>
          <MiddleDivider />
          <AppbarLink
            href="/profile"
            onClick={() => handlePageChange("/profile")}
            {...(pathname === "/profile" ? { activepath: "true" } : {})}
          >
            <Typography variant="span" marginLeft={2}>
              Profile
            </Typography>
          </AppbarLink>
          <MiddleDivider />

          <Box padding="0 16px" marginTop={2}>
            {user && <Button title="Logout" sx={{ width: "100%" }} />}
          </Box>
        </Stack>
      </MuiDrawer>
    </>
  );
};

export default Drawer;
