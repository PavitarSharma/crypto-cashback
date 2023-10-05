import { Box, Grid, Stack, Typography } from "@mui/material";
import Button from "../Button";
import { HiArrowLongRight } from "react-icons/hi2";
import { Colors } from "@/styles/theme/theme";

const WalletInfo = ({ mobScreen }) => {
  return (
    <Grid container spacing={3} sx={{ placeItems: "center", marginTop: 4 }}>
      <Grid item md={5} xs={12}>
        <Stack textAlign={mobScreen && "center"} gap="10px">
          <Typography fontSize={32}>Quick E-Wallet Access</Typography>
          <Typography
            fontSize={18}
            color="rgba(0, 0, 0, 0.87)"
            marginTop={1}
            marginBottom={1}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sequi
            illum, fugiat optio fuga itaque adipisci. Odio facere tempora
            expedita.
          </Typography>
          <Typography fontSize={18} color={Colors.danger} fontWeight={600}>
            You can withdraw your funds or convert into money whenever your
            want.
          </Typography>

          <Box>
            <Button
              size="large"
              title="Sign up"
              endIcon={<HiArrowLongRight />}
            />
          </Box>
        </Stack>
      </Grid>
      <Grid item md={7} xs={12}>
        <Box>
          <img
            src="/images/banner3.png"
            alt="banner"
            height="100%"
            width="100%"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default WalletInfo;
