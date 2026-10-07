import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {},
});

type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export {store};
export type {AppDispatch, State};
