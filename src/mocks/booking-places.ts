type BookingPlace = {
  id: string;
  title: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
};

const BOOKING_PLACES: BookingPlace[] = [
  {
    id: 'karpovka',
    title: 'м. Петроградская',
    address: 'наб. реки Карповки 5, лит П, м. Петроградская',
    location: {
      lat: 59.96825,
      lng: 30.31748,
    },
  },
  {
    id: 'rubinstein',
    title: 'м. Достоевская',
    address: 'ул. Рубинштейна 13, м. Достоевская',
    location: {
      lat: 59.92738,
      lng: 30.34491,
    },
  },
  {
    id: 'vosstaniya',
    title: 'м. Площадь Восстания',
    address: 'Лиговский проспект 43-45, м. Площадь Восстания',
    location: {
      lat: 59.92986,
      lng: 30.36037,
    },
  },
];

export {BOOKING_PLACES};
export type {BookingPlace};
