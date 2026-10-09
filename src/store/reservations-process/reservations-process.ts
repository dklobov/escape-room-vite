import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import type {Booking} from '../../types/booking';

type ReservationsProcess = {
  reservations: Booking[];
  isReservationsLoading: boolean;
};

const initialState: ReservationsProcess = {
  reservations: [],
  isReservationsLoading: false,
};

const reservationsProcess = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    setReservations: (state, action: PayloadAction<Booking[]>) => {
      state.reservations = action.payload;
    },
    removeReservation: (state, action: PayloadAction<string>) => {
      state.reservations = state.reservations.filter((reservation) => reservation.id !== action.payload);
    },
    setReservationsLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isReservationsLoading = action.payload;
    },
  },
});

const {
  removeReservation,
  setReservations,
  setReservationsLoadingStatus,
} = reservationsProcess.actions;

export {
  removeReservation,
  reservationsProcess,
  setReservations,
  setReservationsLoadingStatus,
};
