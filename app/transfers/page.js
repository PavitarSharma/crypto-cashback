"use client";

import Button from "@/components/Button";
import MuiSelect from "@/components/inputs/MuiSelect";
import { Colors } from "@/styles/theme/theme";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi2";
import { AiOutlineSwap } from "react-icons/ai";

const Transfers = () => {
  const [active, setActive] = useState("Transfer");

  const handleChangeActive = (type) => {
    setActive(type);
  };

  return (
    <Box padding={2}>
      <Stack direction="row" alignItems="center" gap="20px" marginBottom={4}>
        <Button
          variant={active === "Transfer" ? "contained" : "outlined"}
          title="Transfer"
          onClick={() => handleChangeActive("Transfer")}
          sx={{
            color: active === "Transfer" ? "white" : "black",
          }}
        />
        <Button
          sx={{
            color: active === "Swap" ? "white" : "black",
          }}
          variant={active === "Swap" ? "contained" : "outlined"}
          title="Swap"
          onClick={() => handleChangeActive("Swap")}
        />
      </Stack>

      {active === "Transfer" && (
        <>
          <Typography
            fontSize={24}
            fontWeight={600}
            color={Colors.black}
            marginBottom={2}
          >
            Available
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={2} md={4} sm={6} xs={12}>
              <TransferSwapCard
                title="FIAT EQUIVALENT"
                total="0,000"
                currency="USD"
                calculation="Equivalent"
              />
            </Grid>

            <Grid item lg={2} md={4} sm={6} xs={12}>
              <TransferSwapCard
                title="BITCOIN"
                total="0"
                currency="SATS"
                calculation={`Min: 76890.80 SATS`}
              />
            </Grid>
            <Grid item lg={2} md={4} sm={6} xs={12}>
              <TransferSwapCard
                title="ETHEREUM"
                total="0"
                currency="ETH"
                calculation={`Min: 785.01 ETH`}
              />
            </Grid>
            <Grid item lg={2} md={4} sm={6} xs={12}>
              <TransferSwapCard
                title="SOLANA"
                total="0"
                currency="SOL"
                calculation={`Min: 0.80 SOL`}
              />
            </Grid>
            <Grid item lg={2} md={4} sm={6} xs={12}>
              <TransferSwapCard
                title="BIT2ME"
                total="0"
                currency="B2M"
                calculation={`Min: 76890.80 B2M`}
              />
            </Grid>
            <Grid item lg={2} md={4} sm={6} xs={12}>
              <TransferSwapCard
                title="BITGET"
                total="0"
                currency="BGB"
                calculation={`Min: 14587.80 BGB`}
              />
            </Grid>
          </Grid>

          <Box
            bgcolor={Colors.shaft}
            color="white"
            width="300px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="50px"
            borderRadius={2}
            marginTop={3}
            sx={{ cursor: "pointer" }}
          >
            Insufficient funds for transfer.
          </Box>
        </>
      )}

      {active === "Swap" && (
        <>
          <Typography
            fontSize={24}
            fontWeight={600}
            color={Colors.black}
            marginBottom={2}
          >
            Available
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={2} md={4} sm={6} xs={12}>
              <TransferSwapCard
                title="FIAT EQUIVALENT"
                total="0,000"
                currency="USD"
                calculation="Equivalent"
              />
            </Grid>

            <Grid item lg={2} md={4} sm={6} xs={12}>
              <TransferSwapCard
                title="BITCOIN"
                total="0"
                currency="SATS"
                calculation={`Min: 76890.80 SATS`}
              />
            </Grid>
            <Grid item lg={2} md={4} sm={6} xs={12}>
              <TransferSwapCard
                title="ETHEREUM"
                total="0"
                currency="ETH"
                calculation={`Min: 785.01 ETH`}
              />
            </Grid>
            <Grid item lg={2} md={4} sm={6} xs={12}>
              <TransferSwapCard
                title="SOLANA"
                total="0"
                currency="SOL"
                calculation={`Min: 0.80 SOL`}
              />
            </Grid>
            <Grid item lg={2} md={4} sm={6} xs={12}>
              <TransferSwapCard
                title="BIT2ME"
                total="0"
                currency="B2M"
                calculation={`Min: 76890.80 B2M`}
              />
            </Grid>
            <Grid item lg={2} md={4} sm={6} xs={12}>
              <TransferSwapCard
                title="BITGET"
                total="0"
                currency="BGB"
                calculation={`Min: 14587.80 BGB`}
              />
            </Grid>
          </Grid>

          <Box
            bgcolor={Colors.shaft}
            color="white"
            width="300px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="50px"
            borderRadius={2}
            marginTop={3}
            sx={{ cursor: "pointer" }}
          >
            Insufficient funds for transfer.
          </Box>

          <Box marginTop={6}>
            <Typography fontSize={24} color={Colors.primary} fontWeight={700}>
              Crypto Swap
            </Typography>
            <Typography color="rgba(0, 0, 0, 0.5)">
              Exchange your crypto instantly
            </Typography>
          </Box>

          <Stack marginTop={3} gap="20px" maxWidth="400px" width="100%">
            <MuiSelect label="Crypto Origin" value="" handleChange={() => {}} />
            <MuiSelect
              label="Crypto Destination"
              value=""
              handleChange={() => {}}
            />

            <Stack gap="10px" direction="row" alignItems="center">
              <Box>
                <HiInformationCircle color={Colors.info} size={24} />
              </Box>
              <Typography fontSize={14} color="rgba(0, 0, 0, 0.5)">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Ducimus cumque fugit velit nam sapiente quo officia soluta
                quaerat, natus ad illum dolore explicabo aut. Temporibus ex
                nesciunt laudantium sint laboriosam!
              </Typography>
            </Stack>

            <Button startIcon={<AiOutlineSwap />} size="large" title="Swap" />
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Transfers;

function TransferSwapCard({ title, total, currency, calculation }) {
  return (
    <Card sx={{ border: `1px solid ${Colors.dove_gray}` }} elevation={0.5}>
      <CardContent>
        <Typography fontWeight={600}>{title}</Typography>
        <Stack
          color={Colors.primary}
          fontSize={20}
          fontWeight={500}
          gap="10px"
          direction="row"
          alignItems="center"
        >
          <Typography variant="sapn">{total}</Typography>
          <Typography variant="span">{currency}</Typography>
        </Stack>

        <Typography marginTop={1} color="rgba(0, 0, 0, 0.6)">
          {calculation}
        </Typography>
      </CardContent>
    </Card>
  );
}
