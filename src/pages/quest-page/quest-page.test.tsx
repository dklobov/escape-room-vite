import {screen} from '@testing-library/react';
import {Route, Routes} from 'react-router-dom';
import {describe, expect, it, vi} from 'vitest';

import {
  AppRoute,
  QuestLevel,
  QuestType,
} from '../../const';
import {renderWithStore} from '../../test-utils/render-with-store';
import QuestPage from './quest-page';

vi.mock('../../store/api-actions', () => ({
  fetchQuestAction: (questId: string) => ({
    type: 'test/fetchQuest',
    payload: questId,
  }),
}));

const quest = {
  id: 'quest-id',
  title: 'Маньяк',
  type: QuestType.Horror,
  typeLabel: 'Ужасы',
  description: 'Описание квеста Маньяк',
  previewImg: 'maniac.jpg',
  previewImgWebp: 'maniac.webp',
  previewImgAlt: 'Квест Маньяк',
  coverImg: 'maniac-cover.jpg',
  coverImgWebp: 'maniac-cover.webp',
  coverImgAlt: 'Обложка квеста Маньяк',
  level: QuestLevel.Medium,
  levelLabel: 'Средний',
  peopleMinCount: 3,
  peopleMaxCount: 6,
};

function renderQuestPage(): void {
  renderWithStore(
    <Routes>
      <Route path={AppRoute.Quest} element={<QuestPage />} />
      <Route path={AppRoute.NotFound} element={<div>Not found page</div>} />
    </Routes>,
    {
      route: '/quest/quest-id',
      initialState: {
        quests: {
          quests: [],
          currentQuest: quest,
          isQuestsLoading: false,
          isQuestLoading: false,
        },
      },
    }
  );
}

describe('Page: QuestPage', () => {
  it('should render quest details from store', () => {
    renderQuestPage();

    expect(screen.getByRole('heading', {name: 'Маньяк'})).toBeInTheDocument();
    expect(screen.getByText('Ужасы')).toBeInTheDocument();
    expect(screen.getByText('Средний')).toBeInTheDocument();
    expect(screen.getByText('Описание квеста Маньяк')).toBeInTheDocument();
    expect(screen.getByAltText('Обложка квеста Маньяк')).toHaveAttribute('src', 'maniac-cover.jpg');
    expect(screen.getByRole('link', {name: 'Забронировать'})).toHaveAttribute('href', '/quest/quest-id/booking');
  });

  it('should render loading text while quest is loading', () => {
    renderWithStore(
      <Routes>
        <Route path={AppRoute.Quest} element={<QuestPage />} />
      </Routes>,
      {
        route: '/quest/quest-id',
        initialState: {
          quests: {
            quests: [],
            currentQuest: null,
            isQuestsLoading: false,
            isQuestLoading: true,
          },
        },
      }
    );

    expect(screen.getByText('Загрузка квеста...')).toBeInTheDocument();
  });

  it('should redirect to not found page when quest is missing', () => {
    renderWithStore(
      <Routes>
        <Route path={AppRoute.Quest} element={<QuestPage />} />
        <Route path={AppRoute.NotFound} element={<div>Not found page</div>} />
      </Routes>,
      {
        route: '/quest/unknown-id',
        initialState: {
          quests: {
            quests: [],
            currentQuest: null,
            isQuestsLoading: false,
            isQuestLoading: false,
          },
        },
      }
    );

    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });
});
