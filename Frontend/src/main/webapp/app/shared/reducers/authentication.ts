// import axios, { AxiosResponse } from 'axios';
// import { Storage } from 'react-jhipster';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { AppThunk } from 'app/config/store';
// import { serializeAxiosError } from './reducer.utils';
// import { API_GET_ACCOUNT, API_GET_ACCOUNT_BY_ID, API_POST_ACCOUNT_AUTHENTICATE, API_URL } from 'app/config/constants/api-endpoints';

// const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

// export const initialState = {
//   loading: false,
//   isAuthenticated: false,
//   loginSuccess: false,
//   loginError: false, // Errors returned from server side
//   showModalLogin: false,
//   account: {} as any,
//   errorMessage: null as unknown as string, // Errors returned from server side
//   redirectMessage: null as unknown as string,
//   sessionHasBeenFetched: false,
//   logoutUrl: null as unknown as string,
// };

// export type AuthenticationState = Readonly<typeof initialState>;

// // Actions

// export const getSession = (): AppThunk => (dispatch, getState) => {
//   dispatch(getAccount());
//   // dispatch(getAccountById());
// };

// export const getAccount = createAsyncThunk('authentication/get_account', async () => axios.get<any>(`${API_URL}${API_GET_ACCOUNT}`), {
//   serializeError: serializeAxiosError,
// });

// // export const getAccountById = createAsyncThunk('authentication/get_account_by_id', async () => axios.get<any>(`${API_URL}${API_GET_ACCOUNT_BY_ID}`), {
// //   serializeError: serializeAxiosError,
// // });

// //'api/authenticate'
// //

// interface IAuthParams {
//   username: string;
//   password: string;
//   rememberMe?: boolean;
// }

// export const authenticate = createAsyncThunk(
//   'authentication/login',
//   async (auth: IAuthParams) => axios.post<any>(`${API_URL}${API_POST_ACCOUNT_AUTHENTICATE}`, auth),
//   {
//     serializeError: serializeAxiosError,
//   },
// );

// export const login: (username: string, password: string, rememberMe?: boolean) => AppThunk =
//   (username, password, rememberMe = false) =>
//   async dispatch => {
//     const result = await dispatch(authenticate({ username, password, rememberMe }));
//     console.log('wat is in result: ', result['payload']['data']);

//     // const response = result.payload as AxiosResponse;
//     // const bearerToken = response?.headers?.authorization;
//     // if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
//     //   const jwt = bearerToken.slice(7, bearerToken.length);
//     //   if (rememberMe) {
//     //     Storage.local.set(AUTH_TOKEN_KEY, jwt);
//     //   } else {
//     //     Storage.session.set(AUTH_TOKEN_KEY, jwt);
//     //   }
//     // }
//     // console.log("wat is in auth token: ", AUTH_TOKEN_KEY);
//     // dispatch(getSession());
//   };

// export const clearAuthToken = () => {
//   if (Storage.local.get(AUTH_TOKEN_KEY)) {
//     Storage.local.remove(AUTH_TOKEN_KEY);
//   }
//   if (Storage.session.get(AUTH_TOKEN_KEY)) {
//     Storage.session.remove(AUTH_TOKEN_KEY);
//   }
// };

// export const logout: () => AppThunk = () => dispatch => {
//   clearAuthToken();
//   dispatch(logoutSession());
// };

// export const clearAuthentication = messageKey => dispatch => {
//   clearAuthToken();
//   dispatch(authError(messageKey));
//   dispatch(clearAuth());
// };

// export const AuthenticationSlice = createSlice({
//   name: 'authentication',
//   initialState: initialState as AuthenticationState,
//   reducers: {
//     logoutSession() {
//       return {
//         ...initialState,
//         showModalLogin: true,
//       };
//     },
//     authError(state, action) {
//       return {
//         ...state,
//         showModalLogin: true,
//         redirectMessage: action.payload,
//       };
//     },
//     clearAuth(state) {
//       return {
//         ...state,
//         loading: false,
//         showModalLogin: true,
//         isAuthenticated: false,
//       };
//     },
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(authenticate.rejected, (state, action) => ({
//         ...initialState,
//         errorMessage: action.error.message,
//         showModalLogin: true,
//         loginError: true,
//       }))
//       .addCase(authenticate.fulfilled, state => ({
//         ...state,
//         loading: false,
//         loginError: false,
//         showModalLogin: false,
//         loginSuccess: true,
//       }))
//       .addCase(getAccount.rejected, (state, action) => ({
//         ...state,
//         loading: false,
//         isAuthenticated: false,
//         sessionHasBeenFetched: true,
//         showModalLogin: true,
//         errorMessage: action.error.message,
//       }))
//       .addCase(getAccount.fulfilled, (state, action) => {
//         const isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
//         return {
//           ...state,
//           isAuthenticated,
//           loading: false,
//           sessionHasBeenFetched: true,
//           account: action.payload.data,
//         };
//       })
//       .addCase(authenticate.pending, state => {
//         state.loading = true;
//       })
//       .addCase(getAccount.pending, state => {
//         state.loading = true;
//       });
//   },
// });

// export const { logoutSession, authError, clearAuth } = AuthenticationSlice.actions;

// // Reducer
// export default AuthenticationSlice.reducer;
