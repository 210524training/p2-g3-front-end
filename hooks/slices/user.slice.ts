import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AxiosError } from 'axios';
import { ChatRoomId, Interest, SecurityQuestion, User } from '../../@types';
import { sendLogin } from '../../remote/api/fetch.users';
import { Auth } from 'aws-amplify';
import defaultImageUri from '../../constants/DefaultImageUri';
import { CognitoUser } from 'amazon-cognito-identity-js';

export type UserState = User | null;

export type LoginCredentials = {
  username: string;
  password: string;
}

export function isAxiosError(error: any): error is AxiosError {
  return 'isAxiosError' in error;
}

export const loginAsync = createAsyncThunk<UserState, LoginCredentials>(
  'user/login/async',
  async ({ username, password }, thunkAPI) => {
    try {

      const res = sendLogin(username, password);
      console.log('response', res);
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