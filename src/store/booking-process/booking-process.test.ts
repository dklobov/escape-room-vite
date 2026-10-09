import {describe, expect, it} from 'vitest';

import {
  bookingProcess,
  setBookingPlaces,
  setBookingPlacesLoadingStatus,
} from './booking-process';
import type {BookingPlace} from '../../types/booking';

describe('BookingProcess reducer', () => {
  it('should set booking places', () => {
    const bookingPlaces: BookingPlace[] = [
      {
        id: 'place-id',
        title: 'Петроградская',
        address: 'Набережная реки Карповки, 5П',
        location: {
          lat: 59.96825,
          lng: 30.31748,
        },
        slots: {
          today: [],
          tomorrow: [],
        },
      },
    ];

    const state = bookingProcess.reducer(
      undefined,
      setBookingPlaces(bookingPlaces)
    );

    expect(state.bookingPlaces).toEqual(bookingPlaces);
  });

  it('should set booking places loading status', () => {
    const state = bookingProcess.reducer(
      undefined,
      setBookingPlacesLoadingStatus(true)
    );

    expect(state.isBookingPlacesLoading).toBe(true);
  });
});
