import {QUEST_LEVEL_FILTERS, QUEST_TYPE_FILTERS, QuestLevel, QuestType} from '../../const';

const FILTER_ICON_HEIGHT = 30;

function QuestsFilter(): JSX.Element {
  return (
    <form className="filter" action="#" method="get">
      <fieldset className="filter__section">
        <legend className="visually-hidden">Тематика</legend>
        <ul className="filter__list">
          {QUEST_TYPE_FILTERS.map(({type, label, icon, iconWidth}) => (
            <li className="filter__item" key={type}>
              <input type="radio" name="type" id={type} defaultChecked={type === QuestType.All} />
              <label className="filter__label" htmlFor={type}>
                <svg className="filter__icon" width={iconWidth} height={FILTER_ICON_HEIGHT} aria-hidden="true">
                  <use xlinkHref={`#${icon}`}></use>
                </svg>
                <span className="filter__label-text">{label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className="filter__section">
        <legend className="visually-hidden">Сложность</legend>
        <ul className="filter__list">
          {QUEST_LEVEL_FILTERS.map(({level, label}) => (
            <li className="filter__item" key={level}>
              <input type="radio" name="level" id={level} defaultChecked={level === QuestLevel.Any} />
              <label className="filter__label" htmlFor={level}>
                <span className="filter__label-text">{label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  );
}

export default QuestsFilter;
