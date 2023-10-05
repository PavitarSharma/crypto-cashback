import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { SiBlockchaindotcom } from "react-icons/si";

const Service = ({ mobScreen }) => {
  return (
    <>
      <Box margin="80px 0">
        <Typography
          fontSize={32}
          fontWeight={700}
          fontStyle="italic"
          textAlign="center"
        >
          Our Services
        </Typography>

        <Typography
          textAlign="center"
          fontSize={18}
          color="rgba(0, 0, 0, 0.87)"
          marginTop={1}
          marginBottom={8}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
          cupiditate qui eum, quibusdam mollitia quos aspernatur quam debitis
          cum adipisci quo maxime vel, ipsa iste voluptates repudiandae quasi
          voluptatum eveniet!
        </Typography>

        <Grid container spacing={3} sx={{ justifyContent: "center"}}>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Card>
              <CardContent>
                <Box textAlign="center">
                  <BsCurrencyBitcoin size={42} />
                </Box>
                <Typography fontWeight={600} textAlign="center" fontSize={20}>
                  Lorem ipsum dolor
                </Typography>
                <Typography
                  color="rgba(0, 0, 0, 0.7)"
                  marginTop={1}
                  textAlign="center"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus temporibus reprehenderit, nostrum quae corporis
                  illum.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Card>
              <CardContent>
                <Box textAlign="center">
                  <FaEthereum size={42} />
                </Box>
                <Typography fontWeight={600} textAlign="center" fontSize={20}>
                  Lorem ipsum dolor
                </Typography>
                <Typography
                  color="rgba(0, 0, 0, 0.7)"
                  marginTop={1}
                  textAlign="center"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus temporibus reprehenderit, nostrum quae corporis
                  illum.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Card>
              <CardContent>
                <Box textAlign="center">
                  <SiBlockchaindotcom size={42} />
                </Box>
                <Typography fontWeight={600} textAlign="center" fontSize={20}>
                  Lorem ipsum dolor
                </Typography>
                <Typography
                  color="rgba(0, 0, 0, 0.7)"
                  marginTop={1}
                  textAlign="center"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus temporibus reprehenderit, nostrum quae corporis
                  illum.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Card>
              <CardContent>
                <Box textAlign="center">
                  <BsCurrencyBitcoin size={42} />
                </Box>
                <Typography fontWeight={600} textAlign="center" fontSize={20}>
                  Lorem ipsum dolor
                </Typography>
                <Typography
                  color="rgba(0, 0, 0, 0.7)"
                  marginTop={1}
                  textAlign="center"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus temporibus reprehenderit, nostrum quae corporis
                  illum.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Service;
