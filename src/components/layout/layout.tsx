import {Outlet} from 'react-router-dom';

import Header from '../header/header';

type LayoutProps = {
  isAuthorized: boolean;
  onLogoutButtonClick: () => void;
};

function Layout({isAuthorized, onLogoutButtonClick}: LayoutProps): JSX.Element {
  return (
    <div className="wrapper">
      <Header
        isAuthorized={isAuthorized}
        onLogoutButtonClick={onLogoutButtonClick}
      />
      <Outlet />
    </div>
  );
}

export default Layout;
