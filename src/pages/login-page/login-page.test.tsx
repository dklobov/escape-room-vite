import {screen} from '@testing-library/react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';

import LoginPage from './login-page';

describe('Page: LoginPage', () => {
  it('should render login form', () => {
    render(<LoginPage onLoginSubmit={vi.fn()} />);

    expect(screen.getByRole('heading', {name: 'Вход'})).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Войти'})).toBeInTheDocument();
  });

  it('should call submit callback with email and password after form submit', async () => {
    const user = userEvent.setup();
    const loginSubmitHandler = vi.fn();

    render(<LoginPage onLoginSubmit={loginSubmitHandler} />);

    await user.type(screen.getByLabelText('E-mail'), 'test-user@htmlacademy.ru');
    await user.type(screen.getByLabelText('Пароль'), 'password1');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', {name: 'Войти'}));

    expect(loginSubmitHandler).toHaveBeenCalledTimes(1);
    expect(loginSubmitHandler).toHaveBeenCalledWith({
      email: 'test-user@htmlacademy.ru',
      password: 'password1',
    });
  });
});
