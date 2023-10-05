import {
  ActionIconsContainerDesktop,
  ActionIconsContainerMobile,
  MyList,
} from "@/styles/Appbar";
import { IconButton, ListItemIcon } from "@mui/material";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import Button from "../Button";
import { Colors } from "@/styles/theme/theme";
import Link from "next/link";
const Actions = ({ matches }) => {
  const Component = matches
    ? ActionIconsContainerMobile
    : ActionIconsContainerDesktop;

  return (
    <Component>
      <MyList type="row" sx={{ gap: "20px"}}>
        <IconButton sx={{ color: Colors.danger, cursor: "pointer" }}>
          <MdFavoriteBorder size={22} />
        </IconButton>

        <Button title="Logout" />
      </MyList>
    </Component>
  );
};

export default Actions;
