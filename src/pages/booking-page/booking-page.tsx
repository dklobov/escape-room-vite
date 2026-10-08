import {useEffect, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';

import Map from '../../components/map/map';
import {AppRoute} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  fetchBookingPlacesAction,
  fetchQuestAction,
} from '../../store/api-actions';
import {
  getBookingPlaces,
  getBookingPlacesLoadingStatus,
} from '../../store/booking-process/selectors';
import {
  getCurrentQuest,
  getQuestLoadingStatus,
} from '../../store/quests-process/selectors';

const BOOKING_MAP_ZOOM = 11;

const BookingSlotDay = {
  Today: 'today',
  Tomorrow: 'tomorrow',
} as const;

const BOOKING_SLOT_DAY_LABEL = {
  [BookingSlotDay.Today]: 'Сегодня',
  [BookingSlotDay.Tomorrow]: 'Завтра',
} as const;

type BookingSlotDayValue = typeof BookingSlotDay[keyof typeof BookingSlotDay];

function getSlotInputId(day: BookingSlotDayValue, time: string) {
  return `${day}${time.replace(':', 'h')}m`;
}

function BookingPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const quest = useAppSelector(getCurrentQuest);
  const isQuestLoading = useAppSelector(getQuestLoadingStatus);
  const bookingPlaces = useAppSelector(getBookingPlaces);
  const isBookingPlacesLoading = useAppSelector(getBookingPlacesLoadingStatus);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchQuestAction(id));
      dispatch(fetchBookingPlacesAction(id));
    }
  }, [dispatch, id]);

  if (!id) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (isQuestLoading || isBookingPlacesLoading) {
    return (
      <main className="page-content">
        <div className="container">
          <p>Загрузка бронирования...</p>
        </div>
      </main>
    );
  }

  if (!quest) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (bookingPlaces.length === 0) {
    return (
      <main className="page-content">
        <div className="container">
          <p>Места бронирования не найдены.</p>
        </div>
      </main>
    );
  }

  const selectedPlace = bookingPlaces.find((place) => place.id === selectedPlaceId) ?? bookingPlaces[0];

  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="/img/content/maniac/maniac-bg-size-m.webp, /img/content/maniac/maniac-bg-size-m@2x.webp 2x"
          />
          <img
            src="/img/content/maniac/maniac-bg-size-m.jpg"
            srcSet="/img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
            width="1366"
            height="1959"
            alt=""
          />
        </picture>
      </div>

      <div className="container container--size-s">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle subtitle--size-l page-content__subtitle">
            Бронирование квеста
          </h1>
          <p className="title title--size-m title--uppercase page-content__title">
            {quest.title}
          </p>
        </div>

        <div className="page-content__item">
          <div className="booking-map">
            <div className="map">
              <Map
                center={selectedPlace.location}
                zoom={BOOKING_MAP_ZOOM}
                points={bookingPlaces}
                activePointId={selectedPlace.id}
                onPointClick={setSelectedPlaceId}
              />
            </div>
            <p className="booking-map__address">
              Вы выбрали: {selectedPlace.address}
            </p>
          </div>
        </div>

        <form className="booking-form" action="#" method="post">
          <legend className="visually-hidden">Выбор даты и времени</legend>

          {Object.values(BookingSlotDay).map((day) => (
            <fieldset className="booking-form__date-section" key={day}>
              <legend className="booking-form__date-title">
                {BOOKING_SLOT_DAY_LABEL[day]}
              </legend>
              <div className="booking-form__date-inner-wrapper">
                {selectedPlace.slots[day].map((slot) => {
                  const slotInputId = getSlotInputId(day, slot.time);

                  return (
                    <label className="custom-radio booking-form__date" key={slotInputId}>
                      <input
                        type="radio"
                        id={slotInputId}
                        name="date"
                        required
                        value={slotInputId}
                        disabled={!slot.isAvailable}
                      />
                      <span className="custom-radio__label">{slot.time}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}

          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Контактная информация</legend>

            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="name">Ваше имя</label>
              <input type="text" id="name" name="name" placeholder="Имя" required pattern="[А-Яа-яЁёA-Za-z'- ]{1,}" />
            </div>

            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
              <input type="tel" id="tel" name="tel" placeholder="Телефон" required pattern="[0-9]{10,}" />
            </div>

            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="person">Количество участников</label>
              <input type="number" id="person" name="person" placeholder="Количество участников" required />
            </div>

            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
              <input type="checkbox" id="children" name="children" defaultChecked />
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use xlinkHref="#icon-tick"></use>
                </svg>
              </span>
              <span className="custom-checkbox__label">Со мной будут дети</span>
            </label>
          </fieldset>

          <button className="btn btn--accent btn--cta booking-form__submit" type="submit">
            Забронировать
          </button>

          <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
            <input type="checkbox" id="id-order-agreement" name="user-agreement" required />
            <span className="custom-checkbox__icon">
              <svg width="20" height="17" aria-hidden="true">
                <use xlinkHref="#icon-tick"></use>
              </svg>
            </span>
            <span className="custom-checkbox__label">
              Я согласен с{' '}
              <a className="link link--active-silver link--underlined" href="#todo">
                правилами обработки персональных данных
              </a>{' '}
              и пользовательским соглашением
            </span>
          </label>
        </form>
      </div>
    </main>
  );
}

export default BookingPage;
