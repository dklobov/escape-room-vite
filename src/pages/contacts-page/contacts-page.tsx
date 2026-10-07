import Map from '../../components/map/map';

const CONTACTS_MAP_CENTER = {
  lat: 59.968322,
  lng: 30.317359,
};

const CONTACTS_MAP_ZOOM = 16;
const CONTACTS_POINT_ID = 'contacts';

const CONTACTS_POINTS = [
  {
    id: CONTACTS_POINT_ID,
    title: 'Escape Room',
    location: CONTACTS_MAP_CENTER,
  },
];

function ContactsPage(): JSX.Element {
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
        <div className="page-content__title-wrapper page-content__title-wrapper--underlined">
          <p className="subtitle page-content__subtitle">
            квесты в Санкт-Петербурге
          </p>
          <h1 className="title title--size-m page-content__title">Контакты</h1>
        </div>

        <div className="contacts">
          <dl className="contacts__list">
            <div className="contacts__item">
              <dt className="contacts__dt">Адрес</dt>
              <dd className="contacts__dd">
                <address className="contacts__address">
                  Санкт-Петербург,
                  <br />
                  Набережная реки Карповка, д 5П
                </address>
              </dd>
            </div>

            <div className="contacts__item">
              <dt className="contacts__dt">Режим работы</dt>
              <dd className="contacts__dd">Ежедневно, с 10:00 до 22:00</dd>
            </div>

            <div className="contacts__item">
              <dt className="contacts__dt">Телефон</dt>
              <dd className="contacts__dd">
                <a className="link" href="tel:88003335599">
                  8 (000) 111-11-11
                </a>
              </dd>
            </div>

            <div className="contacts__item">
              <dt className="contacts__dt">E-mail</dt>
              <dd className="contacts__dd">
                <a className="link" href="mailto:info@escape-room.ru">
                  info@escape-room.ru
                </a>
              </dd>
            </div>
          </dl>

          <div className="contacts__map">
            <div className="map">
              <Map
                center={CONTACTS_MAP_CENTER}
                zoom={CONTACTS_MAP_ZOOM}
                points={CONTACTS_POINTS}
                activePointId={CONTACTS_POINT_ID}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactsPage;
