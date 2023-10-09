import authService from "@/services/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

// Register User
export const signUp = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      return await authService.signUp(data);
    } catch (error) {
      console.log(error);
      const message =
        error.response && error.response.data && error.response.data.message;
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Verify Otp
export const verifyOtp = createAsyncThunk(
  "/auth/verify-otp",
  async ({ otp, email, hash }, thunkAPI) => {
    try {
      return await authService.verifyOtp({ otp, email, hash });
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resendOtp = createAsyncThunk(
  "/auth/resend-otp",
  async ({ email }, thunkAPI) => {
    try {
      return await authService.resendOtp({ email });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Login User
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await authService.login(data);
  } catch (error) {
    console.log(error);

    const message =
      error.response && error.response.data && error.response.data.message;
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error);
  }
});

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, thunkAPI) => {
    try {
      return await authService.forgotPassword({ email });
    } catch (error) {
      console.log(error);

      const message =
        error.response && error.response.data && error.response.data.message;
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ newPassword, confirmPassword, token }, thunkAPI) => {
    try {
      return await authService.restPassword({
        newPassword,
        confirmPassword,
        token,
      });
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  user: null,
  status: STATUSES.IDLE,
  token: null,
  otpData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.user = null;
      state.token = null;
    },

    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },

    addOtpData: (state, action) => {
      state.otpData = action.payload;
    },

    removeOtpData: (state) => {
      state.otpData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
        // state.email = action.payload.email;

        // state.message = action.payload.message;
      })
      .addCase(signUp.rejected, (state) => {
        state.status = STATUSES.ERROR;
        // toast.error(action.payload);
      })

      .addCase(login.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
      })
      .addCase(login.rejected, (state) => {
        state.status = STATUSES.ERROR;
        state.user = null;
        state.token = null;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(resetPassword.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { resetStatem, logOut, addOtpData, removeOtpData } =
  authSlice.actions;

export const AuthState = (state) => state.auth;

export default authSlice.reducer;
