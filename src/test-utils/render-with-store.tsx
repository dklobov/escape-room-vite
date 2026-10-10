import {configureStore} from '@reduxjs/toolkit';
import type {ReactElement} from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {render} from '@testing-library/react';

import {bookingProcess} from '../store/booking-process/booking-process';
import {questsProcess} from '../store/quests-process/quests-process';
import {reservationsProcess} from '../store/reservations-process/reservations-process';
import {userProcess} from '../store/user-process/user-process';
import type {State} from '../store';
import {makeState} from './mock-state';

type RenderWithStoreOptions = {
  initialState?: Partial<State>;
  route?: string;
};

function renderWithStore(
  component: ReactElement,
  {
    initialState,
    route = '/',
  }: RenderWithStoreOptions = {}
): ReturnType<typeof render> {
  const store = configureStore({
    reducer: {
      booking: bookingProcess.reducer,
      quests: questsProcess.reducer,
      reservations: reservationsProcess.reducer,
      user: userProcess.reducer,
    },
    preloadedState: makeState(initialState),
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        {component}
      </MemoryRouter>
    </Provider>
  );
}

export {renderWithStore};
