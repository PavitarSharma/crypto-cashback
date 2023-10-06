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

const AppbarDesktop = ({
  matches,
  navbarColor,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = false;

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

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

            <Actions matches={matches} />
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
