"use client";

import { Country } from "country-state-city";
import {
  Autocomplete,
  Box,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RHFTextFiled from "../inputs/RHFTextFiled";
import { Controller, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import Button from "../Button";
import { UserState, updateUserInfo } from "@/redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
const CountryCurrency = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(UserState);
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [crypto, setCrypto] = useState(null);

  const currencies = useMemo(() => {
    const currencyData = [
      ...new Set(countries.map((option) => option.currency)),
    ];

    return currencyData;
  }, [countries]);



  const coins = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      icon: "/images/bitcoin.png",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      icon: "/images/ethereum.png",
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      icon: "/images/solana.png",
    },
    {
      id: "bitget",
      name: "BITGET",
      symbol: "BGB",
      icon: "/images/bgb.png",
    },
    {
      id: "bit2me",
      name: "BIT2ME",
      symbol: "B2M",
      icon: "/images/b2m.svg",
    },
  ];

  const { handleSubmit, control, register, watch } = useForm({
    defaultValues: {
      country: countries.find(
        (option) => (option.name === user?.address?.country && option) || null
      ),
      currency: currencies.find(
        (option) => (option === user?.address?.currency && option) || null
      ),
      crypto: coins.find(
        (option) => option.name === user?.address?.crypto && option
      ),
      language: user?.address?.language || "",
    },
  });

  

  // console.log(watch("country"));

  const onSubmit = async (values) => {
    const { country, currency, crypto, language } = values;

    const body = {
      country: country.name,
      currency,
      crypto: crypto.name,
      language,
    };

   
    await dispatch(updateUserInfo({ id: user?._id, data: body })).unwrap();
    toast.success("Infomation saved");
  };

 

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: "500px",
        width: "100%",
        marginTop: 4
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormGroup>
            <FormLabel sx={{ color: "black", mb: "2px" }}>Country</FormLabel>
            <Controller
              control={control}
              name="country"
              rules={{ required: "Country is required!" }}
              render={({ field, fieldState: { error } }) => {
                const { value, onChange, ref, ...restField } = field;
                return (
                  <Autocomplete
                    id="country"
                    options={countries}
                    autoHighlight
                    {...restField}
                    value={value}
                    isOptionEqualToValue={(option) =>
                      option.name === value.name
                    }
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => {
                      return (
                        <Box key={props.key} component="li" {...props}>
                          {option.flag}
                          <Typography marginLeft={1} variant="span">
                            {option.name}
                          </Typography>
                        </Box>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputRef={ref}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                        error={!!error}
                      />
                    )}
                  />
                );
              }}
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <FormGroup>
            <FormLabel sx={{ color: "black", mb: "2px" }}>Currency</FormLabel>
            <Controller
              control={control}
              name="currency"
              rules={{ required: "Currency is required." }}
              render={({ field, fieldState: { error } }) => {
                const { value, onChange, ref, ...restField } = field;
                return (
                  <Autocomplete
                    id="currency"
                    options={currencies}
                    autoHighlight
                    {...restField}
                    value={value}
                    isOptionEqualToValue={(option) => option === value}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    getOptionLabel={(option) => option}
                    renderOption={(props, option) => {
                      return (
                        <Box key={props.key} component="li" {...props}>
                          {option}
                        </Box>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputRef={ref}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                        error={!!error}
                      />
                    )}
                  />
                );
              }}
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <FormGroup>
            <FormLabel sx={{ color: "black", mb: "2px" }}>Crypo</FormLabel>
            <Controller
              control={control}
              name="crypto"
              rules={{ required: "Crypto is required." }}
              render={({ field, fieldState: { error } }) => {
                const { value, onChange, ref, ...restField } = field;
                return (
                  <Autocomplete
                    id="crypto"
                    options={coins}
                    autoHighlight
                    {...restField}
                    value={value}
                    isOptionEqualToValue={(option) =>
                      option.name === value.name
                    }
                    onChange={(event, newValue) => {
                      onChange(newValue);
                      setCrypto(newValue);
                    }}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => {
                      return (
                        <Box key={props.key} component="li" {...props}>
                          <img
                            src={option.icon}
                            alt="crypto-icon"
                            loading="lazy"
                            width="24px"
                          />
                          <Typography marginLeft={1} variant="span">
                            {option.name}
                          </Typography>
                        </Box>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputRef={ref}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                        error={!!error}
                      />
                    )}
                  />
                );
              }}
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12}>
          <FormGroup>
            <FormLabel sx={{ color: "black", mb: "2px" }}>Language</FormLabel>
            <RHFTextFiled name="language" id="language" control={control} />
          </FormGroup>
        </Grid>
      </Grid>

      <Box marginTop={3}>
        <Button size="large" onClick={handleSubmit(onSubmit)} title="Save Changes" />
      </Box>
    </Paper>
  );
};

export default CountryCurrency;
