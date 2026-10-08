import {configureStore} from '@reduxjs/toolkit';

import {questsProcess} from './quests-process/quests-process';

const store = configureStore({
  reducer: {
    quests: questsProcess.reducer,
  },
});

type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export {store};
export type {AppDispatch, State};
