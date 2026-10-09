import type {AnyAction} from '@reduxjs/toolkit';

import type {State} from '../store';
import {bookingProcess} from '../store/booking-process/booking-process';
import {questsProcess} from '../store/quests-process/quests-process';
import {reservationsProcess} from '../store/reservations-process/reservations-process';
import {userProcess} from '../store/user-process/user-process';

const UNKNOWN_ACTION: AnyAction = {
  type: 'UNKNOWN_ACTION',
};

function makeState(state?: Partial<State>): State {
  return {
    booking: bookingProcess.reducer(undefined, UNKNOWN_ACTION),
    quests: questsProcess.reducer(undefined, UNKNOWN_ACTION),
    reservations: reservationsProcess.reducer(undefined, UNKNOWN_ACTION),
    user: userProcess.reducer(undefined, UNKNOWN_ACTION),
    ...state,
  };
}

export {makeState};
