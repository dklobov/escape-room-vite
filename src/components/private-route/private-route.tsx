import type {ReactElement} from 'react';
import {Navigate} from 'react-router-dom';

import {AppRoute} from '../../const';

type PrivateRouteProps = {
  isAuthorized: boolean;
  children: ReactElement;
};

function PrivateRoute({isAuthorized, children}: PrivateRouteProps): JSX.Element {
  if (!isAuthorized) {
    return <Navigate to={AppRoute.Login} replace />;
  }

  return children;
}

export default PrivateRoute;
