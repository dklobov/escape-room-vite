import type {State} from '..';

function getBookingPlaces(state: State) {
  return state.booking.bookingPlaces;
}

function getBookingPlacesLoadingStatus(state: State) {
  return state.booking.isBookingPlacesLoading;
}

export {
  getBookingPlaces,
  getBookingPlacesLoadingStatus,
};
