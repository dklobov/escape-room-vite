import {useEffect} from 'react';

import BookingCard from '../../components/booking-card/booking-card';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchReservationsAction} from '../../store/api-actions';
import {
  getReservations,
  getReservationsLoadingStatus,
} from '../../store/reservations-process/selectors';

function MyQuestsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const reservations = useAppSelector(getReservations);
  const isReservationsLoading = useAppSelector(getReservationsLoadingStatus);

  useEffect(() => {
    dispatch(fetchReservationsAction());
  }, [dispatch]);

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

      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="title title--size-m page-content__title">
            Мои бронирования
          </h1>
        </div>

        {isReservationsLoading && (
          <p>Загрузка бронирований...</p>
        )}

        {!isReservationsLoading && reservations.length === 0 && (
          <p>Бронирования не найдены.</p>
        )}

        {!isReservationsLoading && reservations.length > 0 && (
          <div className="cards-grid">
            {reservations.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default MyQuestsPage;
