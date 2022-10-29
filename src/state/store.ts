import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import marketRatesReducer from './marketRatesSlice';

export const rootReducer = combineReducers({
  marketRates: marketRatesReducer,
});
export type RootState = ReturnType<typeof rootReducer>
const store = configureStore({
  reducer: {
    marketRates: marketRatesReducer,
  },
});
export const setupStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
  reducer: rootReducer,
  preloadedState,
});
export type AppStore = ReturnType<typeof setupStore>
// @ts-ignore
export type AppDispatch = AppStore['dispatch']

export default store;
