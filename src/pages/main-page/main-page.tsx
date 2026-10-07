import QuestCard from '../../components/quest-card/quest-card';
import QuestsFilter from '../../components/quests-filter/quests-filter';
import {QUESTS} from '../../mocks/quests';

function MainPage(): JSX.Element {
  return (
    <main className="page-content">
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">
            квесты в Санкт-Петербурге
          </h1>
          <h2 className="title title--size-m page-content__title">
            Выберите тематику
          </h2>
        </div>

        <div className="page-content__item">
          <QuestsFilter />
        </div>

        <h2 className="title visually-hidden">Выберите квест</h2>
        <div className="cards-grid">
          {QUESTS.map((quest) => (
            <QuestCard
              key={quest.id}
              id={quest.id}
              title={quest.title}
              previewImg={quest.previewImg}
              previewImgWebp={quest.previewImgWebp}
              previewImgAlt={quest.previewImgAlt}
              level={quest.levelLabel}
              peopleMinCount={quest.peopleMinCount}
              peopleMaxCount={quest.peopleMaxCount}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default MainPage;
