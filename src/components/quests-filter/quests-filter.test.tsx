import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, vi} from 'vitest';

import {
  QuestLevel,
  QuestType,
} from '../../const';
import QuestsFilter from './quests-filter';

describe('Component: QuestsFilter', () => {
  it('should render checked filters and call callbacks after filter change', async () => {
    const user = userEvent.setup();
    const typeChangeHandler = vi.fn();
    const levelChangeHandler = vi.fn();

    render(
      <QuestsFilter
        currentType={QuestType.All}
        currentLevel={QuestLevel.Any}
        onTypeChange={typeChangeHandler}
        onLevelChange={levelChangeHandler}
      />
    );

    expect(screen.getByLabelText('Все квесты')).toBeChecked();
    expect(screen.getByLabelText('Любой')).toBeChecked();

    await user.click(screen.getByLabelText('Ужасы'));
    await user.click(screen.getByLabelText('Сложный'));

    expect(typeChangeHandler).toHaveBeenCalledTimes(1);
    expect(typeChangeHandler).toHaveBeenCalledWith(QuestType.Horror);
    expect(levelChangeHandler).toHaveBeenCalledTimes(1);
    expect(levelChangeHandler).toHaveBeenCalledWith(QuestLevel.Hard);
  });
});
