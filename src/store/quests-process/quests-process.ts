import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import type {QuestPreview} from '../../types/quest';

type QuestsProcess = {
  quests: QuestPreview[];
  isQuestsLoading: boolean;
};

const initialState: QuestsProcess = {
  quests: [],
  isQuestsLoading: false,
};

const questsProcess = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    setQuests: (state, action: PayloadAction<QuestPreview[]>) => {
      state.quests = action.payload;
    },
    setQuestsLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isQuestsLoading = action.payload;
    },
  },
});

const {setQuests, setQuestsLoadingStatus} = questsProcess.actions;

export {
  questsProcess,
  setQuests,
  setQuestsLoadingStatus,
};
