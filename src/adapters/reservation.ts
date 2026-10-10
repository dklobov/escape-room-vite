import {
  QUEST_LEVEL_LABEL,
  QUEST_TYPE_LABEL,
} from '../const';
import type {Booking} from '../types/booking';
import type {BookingDto} from '../types/booking-dto';

const RESERVATION_DATE_LABEL: Record<BookingDto['date'], string> = {
  today: 'сегодня',
  tomorrow: 'завтра',
};

function adaptReservationToClient(reservation: BookingDto): Booking {
  return {
    id: reservation.id,
    quest: {
      id: reservation.quest.id,
      title: reservation.quest.title,
      type: reservation.quest.type,
      typeLabel: QUEST_TYPE_LABEL[reservation.quest.type],
      previewImg: reservation.quest.previewImg,
      previewImgWebp: reservation.quest.previewImgWebp,
      previewImgAlt: `Квест ${reservation.quest.title}`,
      level: reservation.quest.level,
      levelLabel: QUEST_LEVEL_LABEL[reservation.quest.level],
      peopleMinCount: reservation.quest.peopleMinMax[0],
      peopleMaxCount: reservation.quest.peopleMinMax[1],
    },
    date: RESERVATION_DATE_LABEL[reservation.date],
    time: reservation.time,
    address: reservation.location.address,
    peopleCount: reservation.peopleCount,
    withChildren: reservation.withChildren,
  };
}

export {adaptReservationToClient};
