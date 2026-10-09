import {describe, expect, it} from 'vitest';

import {adaptReservationToClient} from './reservation';
import type {BookingDto} from '../types/booking-dto';

describe('Reservation adapter', () => {
  it('should adapt booking dto to client booking', () => {
    const bookingDto: BookingDto = {
      id: 'booking-id',
      date: 'today',
      time: '14:00',
      contactPerson: 'Oliver',
      phone: '899911122233',
      withChildren: true,
      peopleCount: 3,
      placeId: 'place-id',
      location: {
        address: 'Набережная реки Карповки, 5П',
        coords: [59.96825, 30.31748],
      },
      quest: {
        id: 'quest-id',
        title: 'Склеп',
        previewImg: 'preview.jpg',
        previewImgWebp: 'preview.webp',
        level: 'hard',
        type: 'horror',
        peopleMinMax: [2, 5],
      },
    };

    const booking = adaptReservationToClient(bookingDto);

    expect(booking).toEqual({
      id: 'booking-id',
      date: 'сегодня',
      time: '14:00',
      address: 'Набережная реки Карповки, 5П',
      quest: {
        id: 'quest-id',
        title: 'Склеп',
        type: 'horror',
        typeLabel: 'Ужасы',
        description: '',
        previewImg: 'preview.jpg',
        previewImgWebp: 'preview.webp',
        previewImgAlt: 'Квест Склеп',
        coverImg: '',
        coverImgWebp: '',
        coverImgAlt: 'Квест Склеп',
        level: 'hard',
        levelLabel: 'Сложный',
        peopleMinCount: 2,
        peopleMaxCount: 5,
      },
    });
  });
});
