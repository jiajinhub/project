import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { API_GET_ACCOUNT, API_GET_ACCOUNT_BY_ID, API_POST_ACCOUNT_AUTHENTICATE, API_URL } from 'app/config/constants/api-endpoints';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import axios, { AxiosResponse } from 'axios';

// Initial state
const initialState = {
  loading: 0 as number,
  loginFailed: false as boolean,
  loginSuccess: false as boolean,
  isAuthenticated: false as boolean,
  loginUserDetails: {} as string,
  loginError: false,
  showModalLogin: false,
  //   isAuthenticated: false,
  //   loginSuccess: false,
  //   loginError: false, // Errors returned from server side
  //   showModalLogin: false,
  //   account: {} as any,
  //   errorMessage: null as unknown as string, // Errors returned from server side
  //   redirectMessage: null as unknown as string,
  //   sessionHasBeenFetched: false,
  //   logoutUrl: null as unknown as string,
};

// Data type
export type AccountState = Readonly<typeof initialState>;
export type AccountDataType = {
  email: string;
  password: string;
};
export type AccountReducerType = {
  auth?: AccountDataType;
  controller?: AbortController;
};

export type UserDataType = {
  userID: number;
}

export type UserReducerType = {
  userID?: UserDataType,
  controller?: AbortController;
};


// Actions
export const getAccount = createAsyncThunk(
  'account/getAccount',
  async ({ controller }: AccountReducerType, thunkAPI: any): Promise<Object> => {
    //await thunkAPI.dispatch(closeMessage());

    const response: AxiosResponse<any> = await axios.get<any>(`${API_URL}${API_GET_ACCOUNT}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    if (response?.status === 200) {
      return response;
    } else {
      //await thunkAPI.dispatch(errorMessage({ message: response?.data?.error?.description }));
      return thunkAPI.rejectWithValue('Error calling getAccount');
    }
  },
);

export const authenticate = createAsyncThunk('account/authenticate', async ({ auth, controller }: AccountReducerType, thunkAPI: any) => {
  //await thunkAPI.dispatch(closeMessage());

  const response: AxiosResponse<any> = await axios.post<any>(`${API_URL}${API_POST_ACCOUNT_AUTHENTICATE}`, auth, {
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


export const getAccountById = createAsyncThunk('account/retrieveById', async ({ userID, controller }: UserReducerType, thunkAPI: any) => {
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
    return thunkAPI.rejectWithValue('Error calling getAccountById');
  }
});


export const AuthenticationSlice = createSlice({
  name: 'account',
  initialState: initialState as AccountState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAccount.rejected, (state, action) => {
        state.loading -= 1;
        state.loginFailed = true;
        state.showModalLogin = true;
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.loading -= 1;
        state.loginSuccess = true;
      })
      .addCase(getAccountById.rejected, (state, action) => {
        state.loading -= 1;

      })
      .addCase(getAccountById.fulfilled, (state, action) => {
        state.loginUserDetails = action.payload.data;
        state.loading -= 1;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.loading -= 1;
        state.isAuthenticated = false;
        state.loginError = true;
        state.showModalLogin = true;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        const data = action.payload.data;
        // console.log('🚀 ~ .addCase ~ data:', data);
        state.loginUserDetails = data;
        state.loading -= 1;
        state.isAuthenticated = true;
        state.loginError = false;
        state.showModalLogin = false;
      })
      .addMatcher(isPending(getAccount, authenticate), state => {
        state.loading += 1;
      })
      ;
  },
});

export const { reset } = AuthenticationSlice.actions;

// Reducer
export default AuthenticationSlice.reducer;
