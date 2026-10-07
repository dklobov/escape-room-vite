import type {QuestPreview} from './quests';
import {QUESTS} from './quests';

type Booking = {
  id: string;
  quest: QuestPreview;
  date: string;
  time: string;
  address: string;
};

const BOOKINGS: Booking[] = [
  {
    id: 'booking-maniac-today',
    quest: QUESTS.find((quest) => quest.id === 'maniac') as QuestPreview,
    date: 'сегодня',
    time: '17:00',
    address: 'наб. реки Карповки 5, лит П, м. Петроградская',
  },
  {
    id: 'booking-crypt-tomorrow',
    quest: QUESTS.find((quest) => quest.id === 'crypt') as QuestPreview,
    date: 'завтра',
    time: '20:00',
    address: 'наб. реки Карповки 5, лит П, м. Петроградская',
  },
];

export {BOOKINGS};
export type {Booking};
