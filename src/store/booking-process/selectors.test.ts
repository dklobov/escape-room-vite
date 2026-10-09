import {describe, expect, it} from 'vitest';

import {makeState} from '../../test-utils/mock-state';
import type {BookingPlace} from '../../types/booking';
import {
  getBookingPlaces,
  getBookingPlacesLoadingStatus,
} from './selectors';

const bookingPlace: BookingPlace = {
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
};

describe('Booking selectors', () => {
  it('should return booking places', () => {
    const state = makeState({
      booking: {
        bookingPlaces: [bookingPlace],
        isBookingPlacesLoading: false,
      },
    });

    expect(getBookingPlaces(state)).toEqual([bookingPlace]);
  });

  it('should return booking places loading status', () => {
    const state = makeState({
      booking: {
        bookingPlaces: [],
        isBookingPlacesLoading: true,
      },
    });

    expect(getBookingPlacesLoadingStatus(state)).toBe(true);
  });
});
