import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {describe, expect, it, vi} from 'vitest';

import Layout from './layout';

describe('Component: Layout', () => {
  it('should render header and nested route content', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                isAuthorized
                onLogoutButtonClick={vi.fn()}
              />
            }
          >
            <Route index element={<div>Main page content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('link', {name: 'Квесты'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Мои бронирования'})).toBeInTheDocument();
    expect(screen.getByText('Main page content')).toBeInTheDocument();
  });
});
