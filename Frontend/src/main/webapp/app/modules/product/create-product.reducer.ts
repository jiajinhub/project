import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import { API_CREATE_PRODUCT, API_URL } from 'app/config/constants/api-endpoints';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import axios, { AxiosResponse } from 'axios';

// Initial state
const initialState = {
  loading: 0 as number,
  isCreated: false as boolean,
};

// Data type
export type CreateProductState = Readonly<typeof initialState>;
export type CreateProductDataType = {
  name: string;
  category: string;
  price: string;
  quantity: string;
  expiryDate: any; //date?
  description: string;
  nutriGrade: string;
  listId: any; //check this later
};
export type CreateProductReducerType = {
  data?: CreateProductDataType;
  controller?: AbortController;
};

// Actions
export const createProduct = createAsyncThunk(
  'product/create_product',
  async ({ data, controller }: CreateProductReducerType, thunkAPI: any) => {
    //await thunkAPI.dispatch(closeMessage());

    const response: AxiosResponse<any> = await axios.post<any>(`${API_URL}${API_CREATE_PRODUCT}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    if (response?.status === 200) {
      return response;
    } else {
      //await thunkAPI.dispatch(errorMessage({ message: response?.data?.error?.description }));
      return thunkAPI.rejectWithValue('Error calling createProduct');
    }
  },
);

export const CreateProductSlice = createSlice({
  name: 'product',
  initialState: initialState as CreateProductState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createProduct.rejected, (state, action) => {
        state.loading -= 1;
        state.isCreated = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading -= 1;
        state.isCreated = true;
      })
      .addMatcher(isPending(createProduct), state => {
        state.loading += 1;
      });
  },
});

export const { reset } = CreateProductSlice.actions;

// Reducer
export default CreateProductSlice.reducer;
