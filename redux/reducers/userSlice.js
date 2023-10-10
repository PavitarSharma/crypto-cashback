import userService from "@/services/userService";
import { STATUSES } from "@/uilts/Status";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Get User
export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId, thunkAPI) => {
    try {
      return await userService.getUserDetail(userId);
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get All User
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    try {
      return await userService.getAllUsers();
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "user/updatePassword",
  async (data, thunkAPI) => {
    try {
      return await userService.updatePassword(data);
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }, thunkAPI) => {
    try {
      return await userService.updateUser({ id, data });
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;

      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async ({ id, data }, thunkAPI) => {
    try {
      return await userService.updateUserInfo({ id, data });
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;

      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, thunkAPI) => {
    try {
      return await userService.deleteUser(userId);
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "user/updateUserRole",
  async ({ userId, role }, thunkAPI) => {
    try {
      return await userService.updateUserRole({ userId, role });
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
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = [action.payload, ...state.users];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.status = STATUSES.ERROR;
        state.users = [];
      })

      .addCase(getUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(updateUserPassword.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
      })

      .addCase(updateUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(updateUserInfo.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.user = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const UserState = (state) => state.user;

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
