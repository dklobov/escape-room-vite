import {describe, expect, it} from 'vitest';

import {makeState} from '../../test-utils/mock-state';
import type {Quest, QuestPreview} from '../../types/quest';
import {
  getCurrentQuest,
  getQuestLoadingStatus,
  getQuests,
  getQuestsLoadingStatus,
} from './selectors';

const questPreview: QuestPreview = {
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
};

const quest: Quest = {
  ...questPreview,
  description: 'Описание квеста',
  coverImg: 'cover.jpg',
  coverImgWebp: 'cover.webp',
  coverImgAlt: 'Обложка квеста Маньяк',
};

describe('Quests selectors', () => {
  it('should return quests', () => {
    const state = makeState({
      quests: {
        quests: [questPreview],
        currentQuest: null,
        isQuestsLoading: false,
        isQuestLoading: false,
      },
    });

    expect(getQuests(state)).toEqual([questPreview]);
  });

  it('should return current quest', () => {
    const state = makeState({
      quests: {
        quests: [],
        currentQuest: quest,
        isQuestsLoading: false,
        isQuestLoading: false,
      },
    });

    expect(getCurrentQuest(state)).toEqual(quest);
  });

  it('should return quests loading status', () => {
    const state = makeState({
      quests: {
        quests: [],
        currentQuest: null,
        isQuestsLoading: true,
        isQuestLoading: false,
      },
    });

    expect(getQuestsLoadingStatus(state)).toBe(true);
  });

  it('should return quest loading status', () => {
    const state = makeState({
      quests: {
        quests: [],
        currentQuest: null,
        isQuestsLoading: false,
        isQuestLoading: true,
      },
    });

    expect(getQuestLoadingStatus(state)).toBe(true);
  });
});
