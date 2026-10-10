import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it, vi} from 'vitest';

import Header from './header';

describe('Component: Header', () => {
  it('should render login link for guest', () => {
    render(
      <MemoryRouter>
        <Header isAuthorized={false} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', {name: 'Вход'})).toHaveAttribute('href', '/login');
    expect(screen.queryByRole('link', {name: 'Мои бронирования'})).not.toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Квесты'})).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', {name: 'Контакты'})).toHaveAttribute('href', '/contacts');
  });

  it('should render private navigation and call logout callback for authorized user', async () => {
    const user = userEvent.setup();
    const logoutButtonClickHandler = vi.fn();

    render(
      <MemoryRouter>
        <Header
          isAuthorized
          onLogoutButtonClick={logoutButtonClickHandler}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', {name: 'Мои бронирования'})).toHaveAttribute('href', '/my-quests');

    await user.click(screen.getByRole('button', {name: 'Выйти'}));

    expect(logoutButtonClickHandler).toHaveBeenCalledTimes(1);
  });
});
