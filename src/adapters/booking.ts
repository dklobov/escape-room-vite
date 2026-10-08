import type {BookingPlace} from '../types/booking';
import type {BookingPlaceDto} from '../types/booking-dto';

function adaptBookingPlaceToClient(place: BookingPlaceDto): BookingPlace {
  const [lat, lng] = place.location.coords;

  return {
    id: place.id,
    title: place.location.address,
    address: place.location.address,
    location: {
      lat,
      lng,
    },
    slots: place.slots,
  };
}

export {adaptBookingPlaceToClient};
