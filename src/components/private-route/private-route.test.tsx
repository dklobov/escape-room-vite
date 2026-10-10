import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {describe, expect, it} from 'vitest';

import {
  AppRoute,
  AuthorizationStatus,
} from '../../const';
import type {AuthorizationStatusValue} from '../../const';
import PrivateRoute from './private-route';

function renderPrivateRoute(authorizationStatus: AuthorizationStatusValue): void {
  render(
    <MemoryRouter initialEntries={[AppRoute.MyQuests]}>
      <Routes>
        <Route
          path={AppRoute.MyQuests}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <div>Protected content</div>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<div>Login page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Component: PrivateRoute', () => {
  it('should render children for authorized user', () => {
    renderPrivateRoute(AuthorizationStatus.Authorized);

    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  it('should redirect unauthorized user to login page', () => {
    renderPrivateRoute(AuthorizationStatus.Unauthorized);

    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
  });

  it('should render nothing while authorization status is unknown', () => {
    renderPrivateRoute(AuthorizationStatus.Unknown);

    expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
    expect(screen.queryByText('Login page')).not.toBeInTheDocument();
  });
});
