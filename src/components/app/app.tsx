import {useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import {
  AppRoute,
  AuthorizationStatus,
} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import BookingPage from '../../pages/booking-page/booking-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import MyQuestsPage from '../../pages/my-quests-page/my-quests-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import QuestPage from '../../pages/quest-page/quest-page';
import {
  dropToken,
  getToken,
} from '../../services/token';
import {loginAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {
  setAuthorizationStatus,
  setUserEmail,
} from '../../store/user-process/user-process';
import type {LoginRequestDto} from '../../types/user-dto';
import Layout from '../layout/layout';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Authorized;

  useEffect(() => {
    if (authorizationStatus !== AuthorizationStatus.Unknown) {
      return;
    }

    dispatch(setAuthorizationStatus(
      getToken()
        ? AuthorizationStatus.Authorized
        : AuthorizationStatus.Unauthorized
    ));
  }, [authorizationStatus, dispatch]);

  const handleLoginSubmit = (credentials: LoginRequestDto) => {
    void dispatch(loginAction(credentials));
  };

  const handleLogoutButtonClick = () => {
    dropToken();
    dispatch(setUserEmail(''));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Unauthorized));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <Layout
              isAuthorized={isAuthorized}
              onLogoutButtonClick={handleLogoutButtonClick}
            />
          }
        >
          <Route index element={<MainPage />} />
          <Route
            path={AppRoute.Login}
            element={
              isAuthorized
                ? <Navigate to={AppRoute.Main} replace />
                : <LoginPage onLoginSubmit={handleLoginSubmit} />
            }
          />
          <Route path={AppRoute.Contacts} element={<ContactsPage />} />
          <Route path={AppRoute.Quest} element={<QuestPage />} />
          <Route
            path={AppRoute.Booking}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <BookingPage />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.MyQuests}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <MyQuestsPage />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
          <Route path={AppRoute.Unknown} element={<Navigate to={AppRoute.NotFound} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
