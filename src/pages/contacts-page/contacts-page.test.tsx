import {render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import ContactsPage from './contacts-page';

vi.mock('../../components/map/map', () => ({
  default: function MockMap(): JSX.Element {
    return <div>Contacts map</div>;
  },
}));

describe('Page: ContactsPage', () => {
  it('should render contacts information and map placeholder', () => {
    render(<ContactsPage />);

    expect(screen.getByRole('heading', {name: 'Контакты'})).toBeInTheDocument();
    expect(screen.getByText('квесты в Санкт-Петербурге')).toBeInTheDocument();
    expect(screen.getByText(/Набережная реки Карповка, д 5П/i)).toBeInTheDocument();
    expect(screen.getByText('Ежедневно, с 10:00 до 22:00')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: '8 (000) 111-11-11'})).toHaveAttribute('href', 'tel:88003335599');
    expect(screen.getByRole('link', {name: 'info@escape-room.ru'})).toHaveAttribute('href', 'mailto:info@escape-room.ru');
    expect(screen.getByText('Contacts map')).toBeInTheDocument();
  });
});
