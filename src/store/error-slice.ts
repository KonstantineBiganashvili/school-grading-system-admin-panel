import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  globalError: string;
};

const initialState: InitialState = {
  globalError: '',
};

const errorSlice = createSlice({
  name: 'errors',
  initialState,

  reducers: {
    setGlobalError(state, action: PayloadAction<string>) {
      state.globalError = action.payload;
    },

    clearGlobalError(state, action: PayloadAction<undefined>) {
      state.globalError = '';
    },
  },
});

export default errorSlice;
