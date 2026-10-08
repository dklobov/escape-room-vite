import type {State} from '..';

function getQuests(state: State) {
  return state.quests.quests;
}

function getQuestsLoadingStatus(state: State) {
  return state.quests.isQuestsLoading;
}

export {getQuests, getQuestsLoadingStatus};
