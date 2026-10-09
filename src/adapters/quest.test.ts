import {describe, expect, it} from 'vitest';

import {
  adaptQuestPreviewToClient,
  adaptQuestToClient,
} from './quest';
import type {
  QuestDto,
  QuestPreviewDto,
} from '../types/quest-dto';

describe('Quest adapter', () => {
  it('should adapt quest preview dto to client quest preview', () => {
    const questPreviewDto: QuestPreviewDto = {
      id: 'quest-id',
      title: 'Маньяк',
      previewImg: 'preview.jpg',
      previewImgWebp: 'preview.webp',
      level: 'medium',
      type: 'horror',
      peopleMinMax: [3, 6],
    };

    const questPreview = adaptQuestPreviewToClient(questPreviewDto);

    expect(questPreview).toEqual({
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
    });
  });

  it('should adapt quest dto to client quest', () => {
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

    const quest = adaptQuestToClient(questDto);

    expect(quest.description).toBe('Описание квеста');
    expect(quest.coverImg).toBe('cover.jpg');
    expect(quest.coverImgWebp).toBe('cover.webp');
    expect(quest.coverImgAlt).toBe('Обложка квеста Маньяк');
  });
});
