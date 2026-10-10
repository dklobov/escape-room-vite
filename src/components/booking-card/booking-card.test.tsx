import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it, vi} from 'vitest';

import BookingCard from './booking-card';
import type {Booking} from '../../types/booking';

const booking: Booking = {
  id: 'booking-id',
  date: 'сегодня',
  time: '14:00',
  address: 'Набережная реки Карповки, 5П',
  peopleCount: 3,
  withChildren: true,
  quest: {
    id: 'quest-id',
    title: 'Склеп',
    type: 'horror',
    typeLabel: 'Ужасы',
    previewImg: 'crypt.jpg',
    previewImgWebp: 'crypt.webp',
    previewImgAlt: 'Квест Склеп',
    level: 'hard',
    levelLabel: 'Сложный',
    peopleMinCount: 2,
    peopleMaxCount: 5,
  },
};

describe('Component: BookingCard', () => {
  it('should render booking card with quest data and call cancel callback', async () => {
    const user = userEvent.setup();
    const cancelButtonClickHandler = vi.fn((bookingId: string) => bookingId);

    render(
      <MemoryRouter>
        <BookingCard
          booking={booking}
          onCancelButtonClick={cancelButtonClickHandler}
        />
      </MemoryRouter>
    );

    const questLink = screen.getByRole('link', {name: 'Склеп'});
    const cancelButton = screen.getByRole('button', {name: 'Отменить'});

    expect(questLink).toHaveAttribute('href', '/quest/quest-id');
    expect(screen.getByAltText('Квест Склеп')).toHaveAttribute('src', 'crypt.jpg');
    expect(screen.getByText(/\[сегодня,\s14:00\./i)).toBeInTheDocument();
    expect(screen.getByText(/Набережная реки Карповки, 5П/i)).toBeInTheDocument();
    expect(screen.getByText(/3\sчел/i)).toBeInTheDocument();
    expect(screen.getByText('Сложный')).toBeInTheDocument();

    await user.click(cancelButton);

    expect(cancelButtonClickHandler).toHaveBeenCalledTimes(1);
    expect(cancelButtonClickHandler).toHaveBeenCalledWith('booking-id');
  });
});
