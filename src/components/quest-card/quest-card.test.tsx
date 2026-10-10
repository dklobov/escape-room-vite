import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';

import QuestCard from './quest-card';

describe('Component: QuestCard', () => {
  it('should render quest card with title, image, link and quest meta', () => {
    render(
      <MemoryRouter>
        <QuestCard
          id="quest-id"
          title="Маньяк"
          previewImg="maniac.jpg"
          previewImgWebp="maniac.webp"
          previewImgAlt="Изображение квеста Маньяк"
          level="средний"
          peopleMinCount={3}
          peopleMaxCount={6}
        />
      </MemoryRouter>
    );

    const questLink = screen.getByRole('link', {name: 'Маньяк'});
    const questImage = screen.getByAltText('Изображение квеста Маньяк');

    expect(questLink).toBeInTheDocument();
    expect(questLink).toHaveAttribute('href', '/quest/quest-id');
    expect(questImage).toHaveAttribute('src', 'maniac.jpg');
    expect(screen.getByText(/3–6/i)).toBeInTheDocument();
    expect(screen.getByText('средний')).toBeInTheDocument();
  });
});
