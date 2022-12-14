import { RootState } from './store';

export const getPorts = (state: RootState) => state.marketRates.ports;
export const getRates = (state: RootState) => state.marketRates.rates;
export const getRateError = (state: RootState) => state.marketRates.errorRates;
export const getPortsLoadingState = (state: RootState) => state.marketRates.loadingPorts;
export const getRatesLoadingState = (state: RootState) => state.marketRates.loadingRates;
