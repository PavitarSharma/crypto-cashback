"use client";

import { CategorySelect, LeftFilterHeader, TopHeader } from "@/styles/Store";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import DropDown from "../inputs/DropDown";
import { MdGridView, MdList } from "react-icons/md";
import { useCallback, useState } from "react";
import GridView from "./GridView";
import ListView from "./ListView";
import { Colors } from "@/styles/theme/theme";
import Search from "../Search";

const Store = () => {
  const [view, setView] = useState("grid");

  const toggleView = useCallback((type) => setView(type), []);
  return (
    <>
      <TopHeader>
        <Typography variant="p" fontSize={16} color="#222">
          <Typography
            fontWeight={700}
            color="#000"
            marginRight={1}
            variant="span"
          >
            10
          </Typography>
          Store found
        </Typography>

        <LeftFilterHeader>
          <DropDown />
          <Box display="flex" alignItems="center" marginLeft={2}>
            <Typography fontSize={14}>View</Typography>
            <Stack direction="row" alignItems="center" marginLeft={1}>
              <IconButton onClick={() => toggleView("grid")}>
                <MdGridView
                  color={view === "grid" && Colors.success}
                  size={24}
                />
              </IconButton>
              <IconButton>
                <MdList
                  color={view === "list" && Colors.success}
                  onClick={() => toggleView("list")}
                  size={28}
                />
              </IconButton>
            </Stack>
          </Box>
        </LeftFilterHeader>
      </TopHeader>

      <Box display="flex" justifyContent="flex-end">
        <Search placeholder="Search..." />
      </Box>
      <Box height="auto" marginTop={2}>
        {view === "grid" && <GridView />}

        {view === "list" && <ListView />}
      </Box>
    </>
  );
};

export default Store;
