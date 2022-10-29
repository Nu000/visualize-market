import { RootState } from './store';

export const getPorts = (state: RootState) => state.applications.ports;
