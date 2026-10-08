import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import type {BookingPlace} from '../../types/booking';

type BookingProcess = {
  bookingPlaces: BookingPlace[];
  isBookingPlacesLoading: boolean;
};

const initialState: BookingProcess = {
  bookingPlaces: [],
  isBookingPlacesLoading: false,
};

const bookingProcess = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingPlaces: (state, action: PayloadAction<BookingPlace[]>) => {
      state.bookingPlaces = action.payload;
    },
    setBookingPlacesLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isBookingPlacesLoading = action.payload;
    },
  },
});

const {
  setBookingPlaces,
  setBookingPlacesLoadingStatus,
} = bookingProcess.actions;

export {
  bookingProcess,
  setBookingPlaces,
  setBookingPlacesLoadingStatus,
};
