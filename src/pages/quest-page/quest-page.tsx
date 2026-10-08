import {useEffect} from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';

import {AppRoute} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchQuestAction} from '../../store/api-actions';
import {
  getCurrentQuest,
  getQuestLoadingStatus,
} from '../../store/quests-process/selectors';

function QuestPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const quest = useAppSelector(getCurrentQuest);
  const isQuestLoading = useAppSelector(getQuestLoadingStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchQuestAction(id));
    }
  }, [dispatch, id]);

  if (!id) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (isQuestLoading) {
    return (
      <main className="page-content">
        <div className="container">
          <p>Загрузка квеста...</p>
        </div>
      </main>
    );
  }

  if (!quest) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  const {
    title,
    typeLabel,
    description,
    coverImg,
    coverImgWebp,
    coverImgAlt,
    levelLabel,
    peopleMinCount,
    peopleMaxCount,
  } = quest;

  const bookingPath = `/quest/${id}/booking`;

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet={coverImgWebp} />
          <img src={coverImg} width="1366" height="768" alt={coverImgAlt} />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">
            {title}
          </h1>
          <p className="subtitle quest-page__subtitle">
            <span className="visually-hidden">Жанр:</span>
            {typeLabel}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width="11" height="14" aria-hidden="true">
                <use xlinkHref="#icon-person"></use>
              </svg>
              {peopleMinCount}&ndash;{peopleMaxCount}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-level"></use>
              </svg>
              {levelLabel}
            </li>
          </ul>
          <p className="quest-page__description">{description}</p>
          <Link className="btn btn--accent btn--cta quest-page__btn" to={bookingPath}>
            Забронировать
          </Link>
        </div>
      </div>
    </main>
  );
}

export default QuestPage;
