"use client";

import Button from "@/components/Button";
import BalanceCard from "@/components/wallet/BalanceCard";
import ActivityTable from "@/components/wallet/table/Table";
import { Colors } from "@/styles/theme/theme";
import {
  Box,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Wallet = () => {
  const [active, setActive] = useState("Balance");

  const handleChangeActive = (type) => {
    setActive(type);
  };

  return (
    <Box padding={2}>
      <Stack direction="row" alignItems="center" gap="20px" marginBottom={4}>
        <Button
          variant={active === "Balance" ? "contained" : "outlined"}
          title="Balance"
          onClick={() => handleChangeActive("Balance")}
          sx={{
            color: active === "Balance" ? "white" : "black",
          }}
        />
        <Button
          sx={{
            color: active === "Activity" ? "white" : "black",
          }}
          variant={active === "Activity" ? "contained" : "outlined"}
          title="Activity"
          onClick={() => handleChangeActive("Activity")}
        />
      </Stack>

      {active === "Balance" && (
        <>
          <Grid container spacing={3}>
            <Grid item md={4} sm={6} xs={12}>
              <BalanceCard
                title="FIAT EQUIVALENT"
                total="0,000"
                currency="USD"
              />
            </Grid>

            <Grid item md={4} sm={6} xs={12}>
              <BalanceCard
                title="BITCOIN"
                total="0"
                currency="SATS"
                image="/images/bitcoin.png"
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <BalanceCard
                title="ETHEREUM"
                total="0"
                currency="ETH"
                image="/images/ethereum.png"
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <BalanceCard
                title="SOLANA"
                total="0"
                currency="SOL"
                image="/images/solana.png"
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <BalanceCard
                title="BIT2ME"
                total="0"
                currency="B2M"
                image="/images/b2m.svg"
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <BalanceCard
                title="BITGET"
                total="0"
                currency="BGB"
                image="/images/bgb.png"
              />
            </Grid>
          </Grid>

          <TableContainer
            sx={{
              border: `1px solid ${Colors.dove_gray}`,
              marginTop: 6,
              borderRadius: 2,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, fontSize: 16, textAlign: "center" }}
                  >
                    FIAT
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, fontSize: 16, textAlign: "center" }}
                  >
                    BITCOIN
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, fontSize: 16, textAlign: "center" }}
                  >
                    ETHEREUM
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, fontSize: 16, textAlign: "center" }}
                  >
                    SOLANA
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, fontSize: 16, textAlign: "center" }}
                  >
                    BIT2ME
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 700, fontSize: 16, textAlign: "center" }}
                  >
                    BITGET
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      color: Colors.warning,
                      fontWeight: 600,
                      fontSize: 16,
                    }}
                  >
                    Pending
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 16 }}>
                    0,000 USD
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 16 }}>
                    0 SATS
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 16 }}>
                    0 ETH
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 16 }}>
                    0 SOL
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 16 }}>
                    0 B2M
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 16 }}>
                    0 BGB
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      color: Colors.primary,
                      fontWeight: 600,
                      fontSize: 16,
                    }}
                  >
                    Available
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 16 }}>
                    0,000 USD
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 16 }}>
                    0 SATS
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 16 }}>
                    0 ETH
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 16 }}>
                    0 SOL
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 16 }}>
                    0 B2M
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: 16 }}>
                    0 BGB
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {active === "Activity" && (
        <>
          <Box>
            <Typography fontSize={24} fontWeight={700} color={Colors.primary}>
              Your Activity
            </Typography>

            <Box marginTop={2}>
              <ActivityTable />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Wallet;
