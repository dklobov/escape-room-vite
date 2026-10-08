import {configureStore} from '@reduxjs/toolkit';

import {createApi} from '../services/api';
import {bookingProcess} from './booking-process/booking-process';
import {questsProcess} from './quests-process/quests-process';

const api = createApi();

const store = configureStore({
  reducer: {
    booking: bookingProcess.reducer,
    quests: questsProcess.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export {api, store};
export type {AppDispatch, State};
