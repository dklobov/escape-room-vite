import {describe, expect, it} from 'vitest';

import {
  questsProcess,
  setCurrentQuest,
  setQuestLoadingStatus,
  setQuests,
  setQuestsLoadingStatus,
} from './quests-process';
import type {Quest, QuestPreview} from '../../types/quest';

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

describe('QuestsProcess reducer', () => {
  it('should set quests', () => {
    const state = questsProcess.reducer(undefined, setQuests([questPreview]));

    expect(state.quests).toEqual([questPreview]);
  });

  it('should set current quest', () => {
    const state = questsProcess.reducer(undefined, setCurrentQuest(quest));

    expect(state.currentQuest).toEqual(quest);
  });

  it('should set quests loading status', () => {
    const state = questsProcess.reducer(undefined, setQuestsLoadingStatus(true));

    expect(state.isQuestsLoading).toBe(true);
  });

  it('should set quest loading status', () => {
    const state = questsProcess.reducer(undefined, setQuestLoadingStatus(false));

    expect(state.isQuestLoading).toBe(false);
  });
});
