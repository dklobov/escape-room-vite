import {Link} from 'react-router-dom';

import type {Booking} from '../../types/booking';

type BookingCardProps = {
  booking: Booking;
  onCancelButtonClick: (bookingId: string) => void;
};

function BookingCard({booking, onCancelButtonClick}: BookingCardProps): JSX.Element {
  const {quest, date, time, address} = booking;

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source type="image/webp" srcSet={quest.previewImgWebp} />
          <img src={quest.previewImg} width="344" height="232" alt={quest.previewImgAlt} />
        </picture>
      </div>

      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`/quest/${quest.id}`}>
            {quest.title}
          </Link>
          <span className="quest-card__info">
            [{date},&nbsp;{time}. {address}]
          </span>
        </div>

        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>
            {quest.peopleMaxCount}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>
            {quest.levelLabel}
          </li>
        </ul>

        <button
          className="btn btn--accent btn--secondary quest-card__btn"
          type="button"
          onClick={() => onCancelButtonClick(booking.id)}
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default BookingCard;
