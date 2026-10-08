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

type BookingRequestDto = {
  date: 'today' | 'tomorrow';
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
};

type BookingDto = BookingRequestDto & {
  id: string;
  location: {
    address: string;
    coords: [number, number];
  };
  quest: {
    id: string;
    title: string;
    previewImg: string;
    previewImgWebp: string;
    level: 'easy' | 'medium' | 'hard';
    type: 'adventures' | 'horror' | 'mystic' | 'detective' | 'sci-fi';
    peopleMinMax: [number, number];
  };
};

export type {
  BookingDto,
  BookingPlaceDto,
  BookingRequestDto,
  BookingSlotDto,
};
