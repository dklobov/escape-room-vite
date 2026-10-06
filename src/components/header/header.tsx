import {Link, NavLink, useLocation} from 'react-router-dom';
import {AppRoute} from '../../const';

const NAVIGATION_LINKS = [
  {
    route: AppRoute.Main,
    label: 'Квесты',
  },
  {
    route: AppRoute.Contacts,
    label: 'Контакты',
  },
] as const;

type HeaderProps = {
  isAuthorized: boolean;
  onLogoutButtonClick?: () => void;
};

function Header({isAuthorized, onLogoutButtonClick}: HeaderProps): JSX.Element {
  const location = useLocation();
  const isMainPage = location.pathname === AppRoute.Main;

  return (
    <header className="header">
      <div className="container container--size-l">
        {isMainPage ? (
          <span className="logo header__logo">
            <svg width="134" height="52" aria-hidden="true">
              <use xlinkHref="#logo"></use>
            </svg>
          </span>
        ) : (
          <Link className="logo header__logo" to={AppRoute.Main} aria-label="Перейти на Главную">
            <svg width="134" height="52" aria-hidden="true">
              <use xlinkHref="#logo"></use>
            </svg>
          </Link>
        )}

        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            {NAVIGATION_LINKS.map(({route, label}) => (
              <li className="main-nav__item" key={route}>
                <NavLink className={({isActive}) => `link ${isActive ? 'active' : ''}`} to={route}>
                  {label}
                </NavLink>
              </li>
            ))}

            {isAuthorized && (
              <li className="main-nav__item">
                <NavLink className={({isActive}) => `link ${isActive ? 'active' : ''}`} to={AppRoute.MyQuests}>
                  Мои бронирования
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="header__side-nav">
          {isAuthorized ? (
            <button className="btn btn--accent header__side-item" type="button" onClick={onLogoutButtonClick}>
              Выйти
            </button>
          ) : (
            <Link className="btn btn--accent header__side-item" to={AppRoute.Login}>
              Вход
            </Link>
          )}

          <a className="link header__side-item header__phone-link" href="tel:88001111111">
            8 (000) 111-11-11
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
