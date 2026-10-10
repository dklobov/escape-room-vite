import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it} from 'vitest';

import {
  QuestLevel,
  QuestType,
} from '../../const';
import {renderWithStore} from '../../test-utils/render-with-store';
import type {QuestPreview} from '../../types/quest';
import MainPage from './main-page';

const quests: QuestPreview[] = [
  {
    id: 'crypt-id',
    title: 'Склеп',
    type: QuestType.Horror,
    typeLabel: 'Ужасы',
    previewImg: 'crypt.jpg',
    previewImgWebp: 'crypt.webp',
    previewImgAlt: 'Квест Склеп',
    level: QuestLevel.Hard,
    levelLabel: 'Сложный',
    peopleMinCount: 2,
    peopleMaxCount: 5,
  },
  {
    id: 'maniac-id',
    title: 'Маньяк',
    type: QuestType.Horror,
    typeLabel: 'Ужасы',
    previewImg: 'maniac.jpg',
    previewImgWebp: 'maniac.webp',
    previewImgAlt: 'Квест Маньяк',
    level: QuestLevel.Medium,
    levelLabel: 'Средний',
    peopleMinCount: 3,
    peopleMaxCount: 6,
  },
  {
    id: 'ritual-id',
    title: 'Ритуал',
    type: QuestType.Mystic,
    typeLabel: 'Мистика',
    previewImg: 'ritual.jpg',
    previewImgWebp: 'ritual.webp',
    previewImgAlt: 'Квест Ритуал',
    level: QuestLevel.Easy,
    levelLabel: 'Лёгкий',
    peopleMinCount: 3,
    peopleMaxCount: 5,
  },
];

describe('Page: MainPage', () => {
  it('should render page title and quest cards from store', () => {
    renderWithStore(<MainPage />, {
      initialState: {
        quests: {
          quests,
          currentQuest: null,
          isQuestsLoading: false,
          isQuestLoading: false,
        },
      },
    });

    expect(screen.getByText('Выберите тематику')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Склеп'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Маньяк'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Ритуал'})).toBeInTheDocument();
  });

  it('should render loading text while quests are loading', () => {
    renderWithStore(<MainPage />, {
      initialState: {
        quests: {
          quests: [],
          currentQuest: null,
          isQuestsLoading: true,
          isQuestLoading: false,
        },
      },
    });

    expect(screen.getByText('Загрузка квестов...')).toBeInTheDocument();
  });

  it('should filter quests by type and level', async () => {
    const user = userEvent.setup();

    renderWithStore(<MainPage />, {
      initialState: {
        quests: {
          quests,
          currentQuest: null,
          isQuestsLoading: false,
          isQuestLoading: false,
        },
      },
    });

    await user.click(screen.getByLabelText('Ужасы'));

    expect(screen.getByRole('link', {name: 'Склеп'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Маньяк'})).toBeInTheDocument();
    expect(screen.queryByRole('link', {name: 'Ритуал'})).not.toBeInTheDocument();

    await user.click(screen.getByLabelText('Сложный'));

    expect(screen.getByRole('link', {name: 'Склеп'})).toBeInTheDocument();
    expect(screen.queryByRole('link', {name: 'Маньяк'})).not.toBeInTheDocument();
  });
});
