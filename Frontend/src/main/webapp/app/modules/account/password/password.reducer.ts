import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { API_UPDATE_PASSWORD, API_URL } from 'app/config/constants/api-endpoints';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import axios, { AxiosResponse } from 'axios';

// Initial state
const initialState = {
  loading: 0 as number,
  error: false,
  updatedDetails: {} as string,
  successMessage: '' as string,
};

// Data type
export type UpdateAccountState = Readonly<typeof initialState>;
export type UpdateAccountDataType = {
  userId: number;
  email: string;
  password: string;
  hasdarktheme: string;
};
export type UpdateAccountReducerType = {
  data?: UpdateAccountDataType;
  controller?: AbortController;
};

// Actions
export const updateAcc = createAsyncThunk(
  'account/updateAccount/password',
  async ({ data, controller }: UpdateAccountReducerType, thunkAPI: any) => {
    //await thunkAPI.dispatch(closeMessage());

    const response: AxiosResponse<any> = await axios.post<any>(`${API_URL}${API_UPDATE_PASSWORD}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    if (response?.status === 200) {
      return response;
    } else {
      //await thunkAPI.dispatch(errorMessage({ message: response?.data?.error?.description }));
      return thunkAPI.rejectWithValue('Error calling updateAccount');
    }
  },
);

export const PasswordSlice = createSlice({
  name: 'settings',
  initialState: initialState as UpdateAccountState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateAcc.rejected, (state, action) => {
        state.loading -= 1;
        state.error = true;
      })
      .addCase(updateAcc.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.updatedDetails = data;
        state.loading -= 1;
        state.error = false;
        state.successMessage = action.payload.message;
        
      })
      .addMatcher(isPending(updateAcc), state => {
        state.loading += 1;
        state.error = true;
      });
  },
});

export const { reset } = PasswordSlice.actions;

// Reducer
export default PasswordSlice.reducer;
