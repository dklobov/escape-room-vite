import type {ReactElement} from 'react';
import {Navigate} from 'react-router-dom';

import {
  AppRoute,
  AuthorizationStatus,
} from '../../const';
import type {AuthorizationStatusValue} from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatusValue;
  children: ReactElement;
};

function PrivateRoute({authorizationStatus, children}: PrivateRouteProps): JSX.Element | null {
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }
  if (authorizationStatus !== AuthorizationStatus.Authorized) {
    return <Navigate to={AppRoute.Login} replace />;
  }

  return children;
}

export default PrivateRoute;
