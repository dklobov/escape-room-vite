import type {State} from '..';

function getReservations(state: State) {
  return state.reservations.reservations;
}

function getReservationsLoadingStatus(state: State) {
  return state.reservations.isReservationsLoading;
}

export {
  getReservations,
  getReservationsLoadingStatus,
};
