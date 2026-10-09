import {describe, expect, it} from 'vitest';

import {adaptBookingPlaceToClient} from './booking';
import type {BookingPlaceDto} from '../types/booking-dto';

describe('Booking adapter', () => {
  it('should adapt booking place dto to client booking place', () => {
    const bookingPlaceDto: BookingPlaceDto = {
      id: 'place-id',
      location: {
        address: 'Лиговский пр., 30',
        coords: [59.92746882478306, 30.36065457317038],
      },
      slots: {
        today: [
          {
            time: '14:00',
            isAvailable: true,
          },
        ],
        tomorrow: [
          {
            time: '20:00',
            isAvailable: false,
          },
        ],
      },
    };

    const bookingPlace = adaptBookingPlaceToClient(bookingPlaceDto);

    expect(bookingPlace).toEqual({
      id: 'place-id',
      title: 'Лиговский пр., 30',
      address: 'Лиговский пр., 30',
      location: {
        lat: 59.92746882478306,
        lng: 30.36065457317038,
      },
      slots: bookingPlaceDto.slots,
    });
  });
});
