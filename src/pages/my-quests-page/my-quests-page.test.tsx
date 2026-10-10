import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';

import {
  QuestLevel,
  QuestType,
} from '../../const';
import {renderWithStore} from '../../test-utils/render-with-store';
import type {Booking} from '../../types/booking';
import MyQuestsPage from './my-quests-page';

const apiActionMocks = vi.hoisted(() => ({
  deleteReservationAction: vi.fn((reservationId: string) => ({
    type: 'test/deleteReservation',
    payload: reservationId,
  })),
  fetchReservationsAction: vi.fn(() => ({
    type: 'test/fetchReservations',
  })),
}));

vi.mock('../../store/api-actions', () => ({
  deleteReservationAction: apiActionMocks.deleteReservationAction,
  fetchReservationsAction: apiActionMocks.fetchReservationsAction,
}));

const booking: Booking = {
  id: 'booking-id',
  date: 'сегодня',
  time: '14:00',
  address: 'Набережная реки Карповки, 5П',
  peopleCount: 3,
  withChildren: true,
  quest: {
    id: 'quest-id',
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
};

describe('Page: MyQuestsPage', () => {
  it('should render loading text while reservations are loading', () => {
    renderWithStore(<MyQuestsPage />, {
      initialState: {
        reservations: {
          reservations: [],
          isReservationsLoading: true,
        },
      },
    });

    expect(screen.getByText('Мои бронирования')).toBeInTheDocument();
    expect(screen.getByText('Загрузка бронирований...')).toBeInTheDocument();
  });

  it('should render empty text when reservations list is empty', () => {
    renderWithStore(<MyQuestsPage />, {
      initialState: {
        reservations: {
          reservations: [],
          isReservationsLoading: false,
        },
      },
    });

    expect(screen.getByText('Мои бронирования')).toBeInTheDocument();
    expect(screen.getByText('Бронирования не найдены.')).toBeInTheDocument();
  });

  it('should render reservations and request cancel after button click', async () => {
    const user = userEvent.setup();

    renderWithStore(<MyQuestsPage />, {
      initialState: {
        reservations: {
          reservations: [booking],
          isReservationsLoading: false,
        },
      },
    });

    expect(screen.getByRole('link', {name: 'Склеп'})).toHaveAttribute('href', '/quest/quest-id');
    expect(screen.getByText(/Набережная реки Карповки, 5П/i)).toBeInTheDocument();
    expect(screen.getByText(/3\sчел/i)).toBeInTheDocument();
    expect(screen.getByText('Сложный')).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: 'Отменить'}));

    expect(apiActionMocks.deleteReservationAction).toHaveBeenCalledWith('booking-id');
  });
});
