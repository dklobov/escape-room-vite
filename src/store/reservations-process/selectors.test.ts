import {describe, expect, it} from 'vitest';

import {makeState} from '../../test-utils/mock-state';
import type {Booking} from '../../types/booking';
import {
  getReservations,
  getReservationsLoadingStatus,
} from './selectors';

const reservation: Booking = {
  id: 'reservation-id',
  date: 'сегодня',
  time: '14:00',
  address: 'Набережная реки Карповки, 5П',
  peopleCount: 3,
  withChildren: true,
  quest: {
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
};

describe('Reservations selectors', () => {
  it('should return reservations', () => {
    const state = makeState({
      reservations: {
        reservations: [reservation],
        isReservationsLoading: false,
      },
    });

    expect(getReservations(state)).toEqual([reservation]);
  });

  it('should return reservations loading status', () => {
    const state = makeState({
      reservations: {
        reservations: [],
        isReservationsLoading: true,
      },
    });

    expect(getReservationsLoadingStatus(state)).toBe(true);
  });
});
