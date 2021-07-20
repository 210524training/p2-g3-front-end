import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AxiosError } from 'axios';
import { User } from '../../@types/index.d';
import { sendLogin, sendLoginCache } from '../../remote/api/fetch.users';

export type UserState = User | null;

export type LoginCredentials = {
  username: string;
  password: string;
}

export const loginAsync = createAsyncThunk<UserState, LoginCredentials>(
  'user/login/async',
  async ({ username, password }, thunkAPI) => {
    try {
      const res = sendLogin(username, password);
      return res;
    } catch (error) {
      console.log('Login error');
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginCache = createAsyncThunk<UserState, LoginCredentials>(
  'user/login/async',
  async ({username, password}, thunkAPI) => {
    try {
      const res = sendLoginCache();
      return res;
    } catch (error) {
      console.log('Login error');
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: null as UserState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    logout: (state) => {
      return null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        // return null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;