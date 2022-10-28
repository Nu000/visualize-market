import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CONSTANTS } from '../constants/AppConstants';
import { IPort, IRate } from './interfaces';
import { FetchError } from './types';

export const fetchPorts = createAsyncThunk<
IPort[], void, { rejectValue:FetchError }>(
  'ports/fetch',
  async (_: void, thunkApi) => {
    const response = await axios.get(CONSTANTS.PORTS_URL, {
      headers: {
        'x-api-key': CONSTANTS.API_KEY,
      },
    });
    const { data } = response;
    if (response.data?.error?.code === 500) {
      return thunkApi.rejectWithValue({
        message: 'Failed to load Ports.',
      });
    }
    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        message: 'Failed to load Ports.',
      });
    }
    return data;
  },
);

export const fetchRates = createAsyncThunk<
IRate[], {origin: string, dest: string}, { rejectValue:FetchError }>(
  'ports/rates',
  async (ports, { rejectWithValue }) => {
    const response = await axios.get(`${CONSTANTS.RATES_URL}origin=${ports.origin}&destination=${ports.dest}`, {
      headers: {
        'x-api-key': CONSTANTS.API_KEY,
      },
    });
    const { data } = response;
    if (response.data?.error?.code === 500) {
      return rejectWithValue({
        message: 'Failed to load Rates.',
      });
    }
    if (response.status !== 200) {
      return rejectWithValue({
        message: 'Failed to load Rates.',
      });
    }
    return data;
  },
);
