import { createSlice } from '@reduxjs/toolkit';
import { IRootState } from './interfaces';
import { fetchPorts, fetchRates } from './thunks';

export const initialState: IRootState = {
  ports: [],
  origin: null,
  destination: null,
  rates: [],
  loadingPorts: false,
  loadingRates: false,
  errorPorts: null,
  errorRates: null,

};

export const applicationSlice = createSlice({
  name: 'marketRates',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchPorts.pending, (state) => {
      state.loadingPorts = true;
      state.errorPorts = null;
    });
    builder.addCase(
      fetchPorts.fulfilled,
      (state, { payload }) => {
        state.ports = payload;
        state.loadingPorts = false;
      },
    );
    builder.addCase(
      fetchPorts.rejected,
      (state, { payload }) => {
        if (payload) state.errorPorts = payload.message;
        state.loadingPorts = false;
      },
    );
    builder.addCase(fetchRates.pending, (state) => {
      state.loadingRates = true;
      state.errorRates = null;
    });
    builder.addCase(
      fetchRates.fulfilled,
      (state, { payload }) => {
        state.rates = payload;
        state.loadingRates = false;
      },
    );
    builder.addCase(
      fetchRates.rejected,
      (state, { payload }) => {
        if (payload) state.errorRates = payload.message;
        state.loadingRates = false;
      },
    );
  },
});

// export const {

// } = applicationSlice.actions;

export default applicationSlice.reducer;