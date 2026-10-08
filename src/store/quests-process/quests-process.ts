import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import type {Quest, QuestPreview} from '../../types/quest';

type QuestsProcess = {
  quests: QuestPreview[];
  currentQuest: Quest | null;
  isQuestsLoading: boolean;
  isQuestLoading: boolean;
};

const initialState: QuestsProcess = {
  quests: [],
  currentQuest: null,
  isQuestsLoading: false,
  isQuestLoading: false,
};

const questsProcess = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    setQuests: (state, action: PayloadAction<QuestPreview[]>) => {
      state.quests = action.payload;
    },
    setCurrentQuest: (state, action: PayloadAction<Quest | null>) => {
      state.currentQuest = action.payload;
    },
    setQuestsLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isQuestsLoading = action.payload;
    },
    setQuestLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isQuestLoading = action.payload;
    },
  },
});

const {
  setCurrentQuest,
  setQuestLoadingStatus,
  setQuests,
  setQuestsLoadingStatus,
} = questsProcess.actions;

export {
  questsProcess,
  setCurrentQuest,
  setQuestLoadingStatus,
  setQuests,
  setQuestsLoadingStatus,
};
