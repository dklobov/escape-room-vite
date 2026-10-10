import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Route, Routes} from 'react-router-dom';
import {describe, expect, it, vi} from 'vitest';

import {
  AppRoute,
  QuestLevel,
  QuestType,
} from '../../const';
import {renderWithStore} from '../../test-utils/render-with-store';
import type {BookingPlace} from '../../types/booking';
import type {BookingRequestDto} from '../../types/booking-dto';
import type {Quest} from '../../types/quest';
import BookingPage from './booking-page';

vi.mock('../../components/map/map', () => ({
  default: ({
    activePointId,
    onPointClick,
    points,
  }: {
    activePointId: string | null;
    onPointClick: (pointId: string) => void;
    points: BookingPlace[];
  }) => (
    <div data-testid="booking-map">
      {points.map((point) => (
        <button
          key={point.id}
          type="button"
          onClick={() => onPointClick(point.id)}
        >
          {activePointId === point.id ? `Выбрано ${point.title}` : point.title}
        </button>
      ))}
    </div>
  ),
}));

const apiActionMocks = vi.hoisted(() => ({
  fetchBookingPlacesAction: vi.fn((questId: string) => ({
    type: 'test/fetchBookingPlaces',
    payload: questId,
  })),
  fetchQuestAction: vi.fn((questId: string) => ({
    type: 'test/fetchQuest',
    payload: questId,
  })),
  postBookingAction: vi.fn((questId: string, booking: BookingRequestDto) => ({
    type: 'test/postBooking',
    payload: {
      questId,
      booking,
    },
  })),
}));

vi.mock('../../store/api-actions', () => ({
  fetchBookingPlacesAction: apiActionMocks.fetchBookingPlacesAction,
  fetchQuestAction: apiActionMocks.fetchQuestAction,
  postBookingAction: apiActionMocks.postBookingAction,
}));

const quest: Quest = {
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

const bookingPlace: BookingPlace = {
  id: 'place-id',
  title: 'Лиговский проспект',
  address: 'Лиговский пр., 30 лит А, м. Пл. Восстания',
  location: {
    lat: 59.92746882478306,
    lng: 30.36065457317038,
  },
  slots: {
    today: [
      {
        time: '14:00',
        isAvailable: true,
      },
      {
        time: '16:00',
        isAvailable: false,
      },
    ],
    tomorrow: [
      {
        time: '20:00',
        isAvailable: true,
      },
    ],
  },
};

function renderBookingPage({
  bookingPlaces = [bookingPlace],
  currentQuest = quest,
  isBookingPlacesLoading = false,
  isQuestLoading = false,
}: {
  bookingPlaces?: BookingPlace[];
  currentQuest?: Quest | null;
  isBookingPlacesLoading?: boolean;
  isQuestLoading?: boolean;
} = {}): void {
  renderWithStore(
    <Routes>
      <Route path={AppRoute.Booking} element={<BookingPage />} />
      <Route path={AppRoute.MyQuests} element={<div>My quests page</div>} />
      <Route path={AppRoute.NotFound} element={<div>Not found page</div>} />
    </Routes>,
    {
      route: '/quest/quest-id/booking',
      initialState: {
        booking: {
          bookingPlaces,
          isBookingPlacesLoading,
        },
        quests: {
          quests: [],
          currentQuest,
          isQuestsLoading: false,
          isQuestLoading,
        },
      },
    }
  );
}

describe('Page: BookingPage', () => {
  it('should render loading text while booking data is loading', () => {
    renderBookingPage({
      isBookingPlacesLoading: true,
    });

    expect(screen.getByText('Загрузка бронирования...')).toBeInTheDocument();
  });

  it('should render empty text when booking places are missing', () => {
    renderBookingPage({
      bookingPlaces: [],
    });

    expect(screen.getByText('Места бронирования не найдены.')).toBeInTheDocument();
  });

  it('should render booking form and disabled unavailable slot', () => {
    renderBookingPage();

    expect(screen.getByText('Бронирование квеста')).toBeInTheDocument();
    expect(screen.getByText('Маньяк')).toBeInTheDocument();
    expect(screen.getByTestId('booking-map')).toBeInTheDocument();
    expect(screen.getByText(/Вы выбрали: Лиговский пр., 30 лит А/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Ваше имя')).toBeInTheDocument();
    expect(screen.getByLabelText('Контактный телефон')).toBeInTheDocument();
    expect(screen.getByLabelText('Количество участников')).toBeInTheDocument();
    expect(screen.getByLabelText('Со мной будут дети')).toBeChecked();
    expect(screen.getByLabelText('16:00')).toBeDisabled();
  });

  it('should send booking data and redirect to my quests page after valid submit', async () => {
    const user = userEvent.setup();

    renderBookingPage();

    await user.click(screen.getByLabelText('14:00'));
    await user.type(screen.getByLabelText('Ваше имя'), 'Oliver');
    await user.type(screen.getByLabelText('Контактный телефон'), '+7 (999) 123-45-67');
    await user.type(screen.getByLabelText('Количество участников'), '3');
    await user.click(screen.getByLabelText(/Я согласен/i));
    await user.click(screen.getByRole('button', {name: 'Забронировать'}));

    expect(apiActionMocks.postBookingAction).toHaveBeenCalledWith('quest-id', {
      date: 'today',
      time: '14:00',
      contactPerson: 'Oliver',
      phone: '+7 (999) 123-45-67',
      withChildren: true,
      peopleCount: 3,
      placeId: 'place-id',
    });

    await waitFor(() => {
      expect(screen.getByText('My quests page')).toBeInTheDocument();
    });
  });

  it('should not send booking data when form is invalid', async () => {
    const user = userEvent.setup();

    renderBookingPage();

    apiActionMocks.postBookingAction.mockClear();

    await user.click(screen.getByRole('button', {name: 'Забронировать'}));

    expect(apiActionMocks.postBookingAction).not.toHaveBeenCalled();
  });
});
