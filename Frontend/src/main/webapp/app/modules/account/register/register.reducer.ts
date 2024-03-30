import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';

import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { API_INSERT_ACCOUNT, API_URL } from 'app/config/constants/api-endpoints';

const initialState = {
  loading: 0 as number,
  registrationSuccess: false,
  // registrationFailure: false,
  errorMessage: null,
  successMessage: null,
};

export type RegisterState = Readonly<typeof initialState>;

//data type
export type RegisterDataType = {
  userId: string;
  email: string;
  password: string;
  hasdarktheme: boolean;
};

export type RegisterReducerType = {
  data?: RegisterDataType;
  controller?: AbortController;
};

// Actions
export const insertAccount = createAsyncThunk(
  'register/insertAccount',
  async ({ data, controller }: RegisterReducerType, thunkAPI: any) => {
    //await thunkAPI.dispatch(closeMessage());

    const response: AxiosResponse<any> = await axios.post<any>(`${API_URL}${API_INSERT_ACCOUNT}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    if (response?.status === 200) {
      return response;
    } else {
      //await thunkAPI.dispatch(errorMessage({ message: response?.data?.error?.description }));
      return thunkAPI.rejectWithValue('Error calling insertAccount');
    }
  },
);

export const RegisterSlice = createSlice({
  name: 'register',
  initialState: initialState as RegisterState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(insertAccount.rejected, (state, action) => {
        state.loading -= 1;
        state.registrationSuccess = false;
      })
      .addCase(insertAccount.fulfilled, (state, action) => {
        const data = action.payload.data;
        console.log('🚀 ~ .addCase ~ data:', data);
        state.loading -= 1;
        state.registrationSuccess = true;
      })
      .addMatcher(isPending(insertAccount), state => {
        state.loading += 1;
      });
  },
});

export const { reset } = RegisterSlice.actions;

// Reducer
export default RegisterSlice.reducer;
