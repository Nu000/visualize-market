import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY } from '../config';
import { CONSTANTS } from '../constants/AppConstants';
import { IPort, IRate } from './interfaces';
import { FetchError } from './types';

export const fetchPorts = createAsyncThunk<
IPort[], void, { rejectValue:FetchError }>(
  'ports/fetch',
  async (_: void, thunkApi) => {
    try {
      const response = await axios.get(CONSTANTS.PORTS_URL, {
        headers: {
          'x-api-key': API_KEY,
        },
      });
      const { data } = response;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue({
        message: 'Rates Not Found',
      });
    }
  },
);

export const fetchRates = createAsyncThunk<
IRate[], {origin: string, dest: string}, { rejectValue:FetchError }>(
  'ports/rates',
  async (ports, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${CONSTANTS.RATES_URL}?origin=${ports.origin}&destination=${ports.dest}`, {
        headers: {
          'x-api-key': API_KEY,
        },
      });
      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue({
        message: 'Rates Not Found',
      });
    }
  },
);
