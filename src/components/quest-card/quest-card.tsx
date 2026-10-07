import {Link} from 'react-router-dom';

type QuestCardProps = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  previewImgAlt: string;
  level: string;
  peopleMinCount: number;
  peopleMaxCount: number;
};

function QuestCard({
  id,
  title,
  previewImg,
  previewImgWebp,
  previewImgAlt,
  level,
  peopleMinCount,
  peopleMaxCount,
}: QuestCardProps): JSX.Element {
  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source type="image/webp" srcSet={previewImgWebp} />
          <img src={previewImg} width="344" height="232" alt={previewImgAlt} />
        </picture>
      </div>

      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`/quest/${id}`}>
            {title}
          </Link>
        </div>

        <ul className="tags quest-card__tags">
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
            {level}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default QuestCard;
