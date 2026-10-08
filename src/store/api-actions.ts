import {ApiRoute} from '../const';
import {adaptQuestPreviewToClient} from '../adapters/quest';
import type {AppThunkAction} from '../types/action';
import type {QuestPreviewDto} from '../types/quest-dto';
import {
  setQuests,
  setQuestsLoadingStatus,
} from './quests-process/quests-process';

function fetchQuestsAction(): AppThunkAction {
  return async (dispatch, _getState, api) => {
    dispatch(setQuestsLoadingStatus(true));

    const {data} = await api.get<QuestPreviewDto[]>(ApiRoute.Quests);
    const quests = data.map((quest) => adaptQuestPreviewToClient(quest));

    dispatch(setQuests(quests));
    dispatch(setQuestsLoadingStatus(false));
  };
}

export {fetchQuestsAction};
