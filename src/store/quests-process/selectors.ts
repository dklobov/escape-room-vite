import type {State} from '..';

function getQuests(state: State) {
  return state.quests.quests;
}

function getCurrentQuest(state: State) {
  return state.quests.currentQuest;
}

function getQuestsLoadingStatus(state: State) {
  return state.quests.isQuestsLoading;
}

function getQuestLoadingStatus(state: State) {
  return state.quests.isQuestLoading;
}

export {
  getCurrentQuest,
  getQuestLoadingStatus,
  getQuests,
  getQuestsLoadingStatus,
};
