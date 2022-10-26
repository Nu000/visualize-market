import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';

import applicationsReducer from './applicationSlice';

export const rootReducer = combineReducers({
  applications: applicationsReducer,
});
export type RootState = ReturnType<typeof rootReducer>
const store = configureStore({
  reducer: {
    applications: applicationsReducer,
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
