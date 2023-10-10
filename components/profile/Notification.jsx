"use client";

import { Colors } from "@/styles/theme/theme";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Notification = () => {
  const [notification, setNotification] = useState([])

  const handleChange = (event) => {

  }
  const cashback = (
    <Box>
      <Typography fontSize={16}>About cashback</Typography>
      <Typography fontSize={14} sx={{ opacity: 0.6 }}>
        Information about your transactions.
      </Typography>
    </Box>
  );

  const offers = (
    <Box>
      <Typography fontSize={16}>
        About cashbackbout offers and promotions
      </Typography>
      <Typography fontSize={14} sx={{ opacity: 0.6 }}>
        We send the most interesting offers.
      </Typography>
    </Box>
  );

  const withdrawl = (
    <Box>
      <Typography fontSize={16}>Balance withdrawl</Typography>
      <Typography fontSize={14} sx={{ opacity: 0.6 }}>
        Confirmation of balance withdrawl.
      </Typography>
    </Box>
  );

  return (
    <Box marginTop={4}>
      <Typography color={Colors.primary}>Site notifications</Typography>

      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked value={notification} onChange={handleChange} />}
          label={cashback}
          sx={{
            marginTop: "20px",
          }}
        />
        <FormControlLabel
          sx={{
            marginTop: "20px",
          }}
          control={<Checkbox />}
          label={offers}
        />
        <FormControlLabel
          sx={{
            marginTop: "20px",
          }}
          control={<Checkbox />}
          label={withdrawl}
        />
      </FormGroup>
    </Box>
  );
};

export default Notification;
