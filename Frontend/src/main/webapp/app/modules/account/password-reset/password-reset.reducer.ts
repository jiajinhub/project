import axios from 'axios';
import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit';

import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';

export type AccountDataType = {
  email: string;
  password: string;
};

export type AccountReducerType = {
  auth?: AccountDataType;
  controller?: AbortController;
};


const initialState = {
  loading: false,
  resetPasswordSuccess: false,
  resetPasswordFailure: false,
  successMessage: null,
};

export type PasswordResetState = Readonly<typeof initialState>;

const apiUrl = 'account/reset-password';
// Actions

export const handlePasswordResetInit = createAsyncThunk(
  'passwordReset/reset_password_init',
  async (mail: string) => {
    try {
      const response = await axios.get('http://localhost:8080/account/checkUser', {
        params: { mail },
        headers: { 'Content-Type': 'application/json' }
      });
      localStorage.setItem('email', mail);
    } catch (e) {
      console.log(e);
    }
  },
  { serializeError: serializeAxiosError },
);

export const handlePasswordResetFinish = createAsyncThunk(
  'passwordReset/reset_password_finish',
  async ({auth}: AccountReducerType) => axios.post('http://localhost:8080/account/resetPassword', auth),
  { serializeError: serializeAxiosError },
);

export const PasswordResetSlice = createSlice({
  name: 'passwordReset',
  initialState: initialState as PasswordResetState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(handlePasswordResetInit.fulfilled, () => ({
        ...initialState,
        loading: false,
        resetPasswordSuccess: true,
        initSuccessMessage: 'Check your email for details on how to reset your password.',
      }))
      .addCase(handlePasswordResetFinish.fulfilled, () => ({
        ...initialState,
        loading: false,
        resetPasswordSuccess: true,
        successMessage: "Your password couldn't be reset. Remember a password request is only valid for 24 hours.",
      }))
      .addMatcher(isPending(handlePasswordResetInit, handlePasswordResetFinish), state => {
        state.loading = true;
      })
      .addMatcher(isRejected(handlePasswordResetInit, handlePasswordResetFinish), () => ({
        ...initialState,
        loading: false,
        resetPasswordFailure: true,
      }));
  },
});

export const { reset } = PasswordResetSlice.actions;

// Reducer
export default PasswordResetSlice.reducer;
