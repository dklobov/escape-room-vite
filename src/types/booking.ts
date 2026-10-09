import type {Quest} from './quest';

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
  quest: Quest;
  date: string;
  time: string;
  address: string;
};

export type {
  Booking,
  BookingPlace,
  BookingSlot,
  BookingSlots,
};
