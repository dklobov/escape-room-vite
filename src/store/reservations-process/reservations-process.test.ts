import {describe, expect, it} from 'vitest';

import {
  removeReservation,
  reservationsProcess,
  setReservations,
  setReservationsLoadingStatus,
} from './reservations-process';
import type {Booking} from '../../types/booking';

const reservation: Booking = {
  id: 'reservation-id',
  date: 'сегодня',
  time: '14:00',
  address: 'Набережная реки Карповки, 5П',
  quest: {
    id: 'quest-id',
    title: 'Маньяк',
    type: 'horror',
    typeLabel: 'Ужасы',
    description: '',
    previewImg: 'preview.jpg',
    previewImgWebp: 'preview.webp',
    previewImgAlt: 'Изображение квеста Маньяк',
    coverImg: '',
    coverImgWebp: '',
    coverImgAlt: 'Обложка квеста Маньяк',
    level: 'medium',
    levelLabel: 'Средний',
    peopleMinCount: 3,
    peopleMaxCount: 6,
  },
};

describe('ReservationsProcess reducer', () => {
  it('should set reservations', () => {
    const state = reservationsProcess.reducer(
      undefined,
      setReservations([reservation])
    );

    expect(state.reservations).toEqual([reservation]);
  });

  it('should remove reservation', () => {
    const state = reservationsProcess.reducer(
      {
        reservations: [reservation],
        isReservationsLoading: false,
      },
      removeReservation(reservation.id)
    );

    expect(state.reservations).toEqual([]);
  });

  it('should set reservations loading status', () => {
    const state = reservationsProcess.reducer(
      undefined,
      setReservationsLoadingStatus(true)
    );

    expect(state.isReservationsLoading).toBe(true);
  });
});
