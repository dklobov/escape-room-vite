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

export type {
  BookingPlace,
  BookingSlot,
  BookingSlots,
};
