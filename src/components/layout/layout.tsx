import {Outlet} from 'react-router-dom';
import Header from '../header/header';

function Layout(): JSX.Element {
  return (
    <div className="wrapper">
      <Header isAuthorized={false} />
      <Outlet />
    </div>
  );
}

export default Layout;
