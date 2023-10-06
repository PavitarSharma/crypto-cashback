const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    otpData: null,
  },
  reducers: {
    setCredentails: (state, action) => {
      const { accessToken, user } = action.payload;
      state.user = user;
      state.token = accessToken;
    },

    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },

    getOtpData: (state, action) => {
      state.otpData = action.payload;
    },

    removeOtpData: (state, action) => {
      state.otpData = null;
    },
  },
});

export const { setCredentails, logOut, getOtpData, removeOtpData } =
  authSlice.actions;

export const AuthState = (state) => state.auth;

export default authSlice.reducer;
