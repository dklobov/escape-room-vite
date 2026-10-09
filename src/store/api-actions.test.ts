import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import type {Action} from 'redux';
import type {ThunkDispatch} from 'redux-thunk';
import {describe, expect, it} from 'vitest';

import {ApiRoute} from '../const';
import {createApi} from '../services/api';
import type {State} from '.';
import {
  fetchQuestAction,
  fetchQuestsAction,
} from './api-actions';
import {
  setCurrentQuest,
  setQuestLoadingStatus,
  setQuests,
  setQuestsLoadingStatus,
} from './quests-process/quests-process';
import type {
  QuestDto,
  QuestPreviewDto,
} from '../types/quest-dto';

type AppDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>;

const api = createApi();
const mockApi = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStoreCreator = configureMockStore<State, Action, AppDispatch>(middlewares);

describe('Api actions', () => {
  it('should dispatch setQuests when GET /quest returns data', async () => {
    const questPreviewDto: QuestPreviewDto = {
      id: 'quest-id',
      title: 'Маньяк',
      previewImg: 'preview.jpg',
      previewImgWebp: 'preview.webp',
      level: 'medium',
      type: 'horror',
      peopleMinMax: [3, 6],
    };

    mockApi.onGet(ApiRoute.Quests).reply(200, [questPreviewDto]);

    const store = mockStoreCreator();

    await store.dispatch(fetchQuestsAction());

    expect(store.getActions()).toEqual([
      setQuestsLoadingStatus(true),
      setQuests([
        {
          id: 'quest-id',
          title: 'Маньяк',
          type: 'horror',
          typeLabel: 'Ужасы',
          previewImg: 'preview.jpg',
          previewImgWebp: 'preview.webp',
          previewImgAlt: 'Изображение квеста Маньяк',
          level: 'medium',
          levelLabel: 'Средний',
          peopleMinCount: 3,
          peopleMaxCount: 6,
        },
      ]),
      setQuestsLoadingStatus(false),
    ]);
  });

  it('should dispatch setCurrentQuest when GET /quest/:id returns data', async () => {
    const questDto: QuestDto = {
      id: 'quest-id',
      title: 'Маньяк',
      description: 'Описание квеста',
      previewImg: 'preview.jpg',
      previewImgWebp: 'preview.webp',
      coverImg: 'cover.jpg',
      coverImgWebp: 'cover.webp',
      level: 'medium',
      type: 'horror',
      peopleMinMax: [3, 6],
    };

    mockApi.onGet(`${ApiRoute.Quest}/${questDto.id}`).reply(200, questDto);

    const store = mockStoreCreator();

    await store.dispatch(fetchQuestAction(questDto.id));

    expect(store.getActions()).toEqual([
      setQuestLoadingStatus(true),
      setCurrentQuest(null),
      setCurrentQuest({
        id: 'quest-id',
        title: 'Маньяк',
        type: 'horror',
        typeLabel: 'Ужасы',
        description: 'Описание квеста',
        previewImg: 'preview.jpg',
        previewImgWebp: 'preview.webp',
        previewImgAlt: 'Изображение квеста Маньяк',
        coverImg: 'cover.jpg',
        coverImgWebp: 'cover.webp',
        coverImgAlt: 'Обложка квеста Маньяк',
        level: 'medium',
        levelLabel: 'Средний',
        peopleMinCount: 3,
        peopleMaxCount: 6,
      }),
      setQuestLoadingStatus(false),
    ]);
  });
});
