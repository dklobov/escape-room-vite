import type {QuestPreview} from './quest';

type BookingSlot = {
  time: string;
  isAvailable: boolean;
};

type BookingSlots = {
  today: BookingSlot[];
  tomorrow: BookingSlot[];
};

type BookingPlace = {
  id: string;
  title: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  slots: BookingSlots;
};

type Booking = {
  id: string;
  quest: QuestPreview;
  date: string;
  time: string;
  address: string;
  peopleCount: number;
  withChildren: boolean;
};

export type {
  Booking,
  BookingPlace,
  BookingSlot,
  BookingSlots,
};
