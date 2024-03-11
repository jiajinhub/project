import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//import { getSession } from 'app/shared/reducers/authentication';
import { AppThunk } from 'app/config/store';
import { API_URL, API_GET_ACCOUNT_BY_ID } from 'app/config/constants/api-endpoints';

const userState = {
  userId: null,
  email: null,
};

export const viewAccount: (userID) => AppThunk = userID => async dispatch => {
  await dispatch(getAccountById(userID));
  //dispatch(getSession());
};

export type UserReducerType = {
  userID?: number,
  controller?: AbortController;
};


export const getAccountById = createAsyncThunk('account/authenticate', async ({ userID, controller }: UserReducerType, thunkAPI: any) => {
  //await thunkAPI.dispatch(closeMessage());

  const response: AxiosResponse<any> = await axios.post<any>(`${API_URL}${API_GET_ACCOUNT_BY_ID}`, userID, {
    headers: {
      'Content-Type': 'application/json',
    },
    signal: controller.signal,
  });

  if (response?.status === 200) {
    return response;
  } else {
    //await thunkAPI.dispatch(errorMessage({ message: response?.data?.error?.description }));
    return thunkAPI.rejectWithValue('Error calling authenticate');
  }
});

export const UserDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: userState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAccountById.pending, state => {
        state.userId = null;
        state.email = null;
      })
      .addCase(getAccountById.rejected, state => {
        state.userId = null;
        state.email = null;
      })
      .addCase(getAccountById.fulfilled, (state, action) => {
        console.log(state);
        console.log(action);
        return { ...state, ...action.payload.data };
      });
  },
});

export default UserDetailsSlice.reducer;
