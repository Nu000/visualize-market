import { createSlice } from '@reduxjs/toolkit';
import { IRootState } from './interfaces';

const initialState: IRootState = {

};

export const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

  },
});

export const {

} = applicationSlice.actions;

export default applicationSlice.reducer;
