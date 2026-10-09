import type {Booking} from '../types/booking';
import type {Quest} from './quests';
import {QUESTS} from './quests';

const BOOKINGS: Booking[] = [
  {
    id: 'booking-maniac-today',
    quest: QUESTS.find((quest) => quest.id === 'maniac') as Quest,
    date: 'сегодня',
    time: '17:00',
    address: 'наб. реки Карповки 5, лит П, м. Петроградская',
  },
  {
    id: 'booking-crypt-tomorrow',
    quest: QUESTS.find((quest) => quest.id === 'crypt') as Quest,
    date: 'завтра',
    time: '20:00',
    address: 'наб. реки Карповки 5, лит П, м. Петроградская',
  },
];

export {BOOKINGS};
export type {Booking};
