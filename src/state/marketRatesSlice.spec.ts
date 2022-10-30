import marketRatesReducer, { initialState } from './marketRatesSlice';
import {
  ports, rates,
} from '../util/mock-data';

import store from './store';
import { fetchPorts, fetchRates } from './thunks';

describe('redux state tests', () => {
  it('initial state', () => {
    const state = store.getState().marketRates;
    expect(state).toEqual(initialState);
  });
  it('sets loading false and list when ports are fulfilled', () => {
    const action = { type: fetchPorts.fulfilled.type, payload: ports };
    const state = marketRatesReducer(initialState, action);
    expect(state).toEqual({
      ...initialState, loadingPorts: false, ports,
    });
  });
  it('sets loading false and list when ports are fulfilled with error', () => {
    const action = { type: fetchPorts.rejected.type, payload: { code: 500, message: 'Error' } };
    const state = marketRatesReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loadingPorts: false, errorPorts: 'Error' });
  });
  it('sets loading false and error when ports are rejected', () => {
    const action = { type: fetchPorts.rejected.type, payload: { message: 'Failed to load Ports.' } };
    const state = marketRatesReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loadingPorts: false, errorPorts: 'Failed to load Ports.' });
  });
  it('sets loading false and list when rates are fulfilled', () => {
    const action = { type: fetchRates.fulfilled.type, payload: rates };
    const state = marketRatesReducer(initialState, action);
    expect(state).toEqual({
      ...initialState, loadingRates: false, rates,
    });
  });
  it('sets loading false and list when rates are fulfilled with error', () => {
    const action = { type: fetchRates.rejected.type, payload: { code: 500, message: 'Error' } };
    const state = marketRatesReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loadingRates: false, errorRates: 'Error' });
  });
  it('sets loading false and error when rates are rejected', () => {
    const action = { type: fetchRates.rejected.type, payload: { message: 'Failed to load Rates.' } };
    const state = marketRatesReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loadingRates: false, errorRates: 'Failed to load Rates.' });
  });
});
