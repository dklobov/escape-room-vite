type BookingSlotDto = {
  time: string;
  isAvailable: boolean;
};

type BookingPlaceDto = {
  id: string;
  location: {
    address: string;
    coords: [number, number];
  };
  slots: {
    today: BookingSlotDto[];
    tomorrow: BookingSlotDto[];
  };
};

export type {
  BookingPlaceDto,
  BookingSlotDto,
};
