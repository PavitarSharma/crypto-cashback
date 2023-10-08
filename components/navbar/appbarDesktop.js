"use client";

import {
  AppbarContainer,
  AppbarHeader,
  AppbarLink,
  MyList,
} from "@/styles/Appbar";
import Link from "next/link";
import Actions from "./Actions";
import { usePathname, useRouter } from "next/navigation";
import { Stack } from "@mui/material";
import Button from "../Button";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, logOut } from "@/redux/reducers/authSlice";
import toast from "react-hot-toast";

const AppbarDesktop = ({ matches, navbarColor }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(AuthState);
  const pathname = usePathname();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/")
    toast.success("Logout successfully done.");
  };

  return (
    <>
      <AppbarContainer navbarstyle={navbarColor}>
        <Link href="/" onClick={() => activePath("/")}>
          <AppbarHeader>Crypto</AppbarHeader>
        </Link>

        {user ? (
          <>
            <MyList type="row" gap="true">
              <AppbarLink
                href="/"
                onClick={() => router.push("/")}
                {...(pathname === "/" ? { activepath: "true" } : {})}
              >
                Store
              </AppbarLink>
              <AppbarLink
                href="/wallet"
                onClick={() => router.push("/wallet")}
                {...(pathname === "/wallet" ? { activepath: "true" } : {})}
              >
                Wallet
              </AppbarLink>
              <AppbarLink
                href="/transfers"
                onClick={() => router.push("/transfers")}
                {...(pathname === "/transfers" ? { activepath: "true" } : {})}
              >
                Transfers
              </AppbarLink>
              <AppbarLink
                href="/profile"
                onClick={() => router.push("/profile")}
                {...(pathname === "/profile" ? { activepath: "true" } : {})}
              >
                Profile
              </AppbarLink>
            </MyList>

            <Actions handleLogout={handleLogout} matches={matches} />
          </>
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
    </>
  );
};

export default AppbarDesktop;
