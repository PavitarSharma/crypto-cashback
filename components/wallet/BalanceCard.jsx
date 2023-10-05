"use client";

import { Colors } from "@/styles/theme/theme";
import { Card, CardContent, Stack, Typography } from "@mui/material";

const BalanceCard = ({ title, total, currency, image }) => {
  return (
    <Card sx={{ border: `1px solid ${Colors.dove_gray}` }} elevation={0.5}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight={600}>{title}</Typography>
          {image && <img src={image} alt={title} width="30px" />}
        </Stack>
        <Typography marginTop={1}>Total</Typography>
        <Stack
          color={Colors.primary}
          fontSize={24}
          fontWeight={500}
          gap="10px"
          direction="row"
          alignItems="center"
        >
          <Typography variant="sapn">{total}</Typography>
          <Typography variant="span">{currency}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
