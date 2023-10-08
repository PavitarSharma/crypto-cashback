"use client";

import { Box, Grid, Typography } from "@mui/material";

const GridView = ({ stores }) => {
  return (
    <>
      {stores?.length > 0 ? (
        <Grid>
          {stores?.map((store, idx) => {
            return <Grid key={idx} item lg={3} md={4} sm={6} xs={12}></Grid>;
          })}
        </Grid>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          marginTop={40}
        >
          <Typography color="rgba(0, 0, 0, .5)" fontWeight={500} fontSize={24}>
            No store found.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default GridView;
