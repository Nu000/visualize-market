import { RootState } from './store';

export const getPorts = (state: RootState) => state.applications.ports;
export const getRates = (state: RootState) => state.applications.rates;
