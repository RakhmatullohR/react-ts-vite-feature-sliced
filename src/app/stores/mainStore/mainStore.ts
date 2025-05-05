import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const mainStore = configureStore({
   reducer: rootReducer,
});

export type RootState = ReturnType<typeof mainStore.getState>;
export type AppDispatch = typeof mainStore.dispatch;
