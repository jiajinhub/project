import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getSession } from 'app/shared/reducers/authentication';
import { AppThunk } from 'app/config/store';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { API_GET_ACCOUNT_BY_ID } from 'app/config/constants/api-endpoints';

const userState = {
    userId: null,
    email: null
  };


// Actions
const apiUrl = 'account';

export const viewAccount: (userID) => AppThunk = userID => async dispatch => {
    await dispatch(getAccountById(userID));
    dispatch(getSession());
  };
  
  
  export const getAccountById = createAsyncThunk(API_GET_ACCOUNT_BY_ID, async (userID: any) => axios.create({
    baseURL: 'http://localhost:8080/',  // Base URL of your Java backend
    headers:{
      'Content-Type': 'application/json'
    }
  }).post<any>(`${apiUrl}/${API_GET_ACCOUNT_BY_ID}`, {userID}), {
    serializeError: serializeAxiosError,
  });
  

export const UserDetailsSlice = createSlice({
    name: 'userDetails',
    initialState: userState,
    reducers: {
    },
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
        .addCase(getAccountById.fulfilled, (state,action) => {
            console.log(state)
            console.log(action)
          return { ...state, ...action.payload.data };
        });
    },
  })
  
  export default UserDetailsSlice.reducer;

  