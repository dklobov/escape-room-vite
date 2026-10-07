import QuestsFilter from '../../components/quests-filter/quests-filter';

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
        <div className="cards-grid"></div>
      </div>
    </main>
  );
}

export default MainPage;
