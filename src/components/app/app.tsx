import {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {AppRoute} from '../../const';
import Layout from '../layout/layout';
import BookingPage from '../../pages/booking-page/booking-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import MyQuestsPage from '../../pages/my-quests-page/my-quests-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import QuestPage from '../../pages/quest-page/quest-page';

function App(): JSX.Element {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleLoginSubmit = () => {
    setIsAuthorized(true);
  };

  const handleLogoutButtonClick = () => {
    setIsAuthorized(false);
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
            element={<LoginPage onLoginSubmit={handleLoginSubmit} />}
          />
          <Route path={AppRoute.Contacts} element={<ContactsPage />} />
          <Route path={AppRoute.Quest} element={<QuestPage />} />
          <Route path={AppRoute.Booking} element={<BookingPage />} />
          <Route path={AppRoute.MyQuests} element={<MyQuestsPage />} />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
