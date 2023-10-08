import {
  ActionIconsContainerDesktop,
  ActionIconsContainerMobile,
  MyList,
} from "@/styles/Appbar";
import { Box, IconButton, ListItemIcon } from "@mui/material";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import Button from "../Button";
import { Colors } from "@/styles/theme/theme";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Actions = ({ matches, handleLogout }) => {
  const Component = matches
    ? ActionIconsContainerMobile
    : ActionIconsContainerDesktop;
  const router = useRouter();

  return (
    <Component>
      <MyList type="row" sx={{ gap: "20px" }}>
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

        <Button onClick={handleLogout} title="Logout" />
      </MyList>
    </Component>
  );
};

export default Actions;
