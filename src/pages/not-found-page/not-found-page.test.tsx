import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import NotFoundPage from './not-found-page';

describe('Page: NotFoundPage', () => {
  it('should render not found title', () => {
    render(<NotFoundPage />);

    expect(screen.getByRole('heading', {name: '404 Not Found'})).toBeInTheDocument();
  });
});
