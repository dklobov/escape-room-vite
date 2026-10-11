import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import Footer from './footer';

describe('Component: Footer', () => {
  it('should render social links', () => {
    render(<Footer />);

    expect(screen.getByRole('link', {name: 'Skype'})).toHaveAttribute('href', 'https://www.skype.com/');
    expect(screen.getByRole('link', {name: 'ВКонтакте'})).toHaveAttribute('href', 'https://vk.com/');
  });
});
