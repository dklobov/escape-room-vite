type QuestPreview = {
  id: string;
  title: string;
  type: string;
  description: string;
  previewImg: string;
  previewImgWebp: string;
  previewImgAlt: string;
  coverImg: string;
  coverImgWebp: string;
  coverImgAlt: string;
  level: string;
  peopleMinCount: number;
  peopleMaxCount: number;
};

const QUESTS: QuestPreview[] = [
  {
    id: 'crypt',
    title: 'Склеп',
    type: 'Приключения',
    description: 'Средневековый склеп скрывает больше тайн, чем кажется на первый взгляд. Вам предстоит найти старые записи, разгадать семейную тайну и выбраться наружу до того, как каменные двери закроются навсегда.',
    previewImg: 'img/content/crypt/crypt-size-s.jpg',
    previewImgWebp: 'img/content/crypt/crypt-size-s.webp',
    previewImgAlt: 'Мужчина в клетке в подземелье.',
    coverImg: 'img/content/crypt/crypt-size-m@2x.jpg',
    coverImgWebp: 'img/content/crypt/crypt-size-s@2x.webp',
    coverImgAlt: 'Мрачное подземелье со старой клеткой.',
    level: 'Сложный',
    peopleMinCount: 2,
    peopleMaxCount: 5,
  },
  {
    id: 'maniac',
    title: 'Маньяк',
    type: 'Ужасы',
    description: 'В комнате с приглушённым светом несколько человек, незнакомых друг с другом, приходят в себя. Никто не помнит, что произошло прошлым вечером. Руки и ноги связаны, но одному из вас получилось освободиться. Сможете ли вы разобраться, что произошло, помочь другим и выбраться из комнаты?',
    previewImg: 'img/content/maniac/maniac-size-s.jpg',
    previewImgWebp: 'img/content/maniac/maniac-size-s.webp',
    previewImgAlt: 'Мужчина в маске в тёмном переходе.',
    coverImg: 'img/content/maniac/maniac-size-m.jpg',
    coverImgWebp: 'img/content/maniac/maniac-size-m.webp',
    coverImgAlt: 'Мужчина в маске стоит в тёмном помещении.',
    level: 'Средний',
    peopleMinCount: 3,
    peopleMaxCount: 6,
  },
  {
    id: 'ritual',
    title: 'Ритуал',
    type: 'Мистика',
    description: 'Старый дом давно пустует, но каждую ночь в нём загораются свечи. Вам предстоит попасть внутрь, восстановить ход загадочного обряда и понять, что именно пробудилось в этих стенах.',
    previewImg: 'img/content/ritual/ritual-size-s.jpg',
    previewImgWebp: 'img/content/ritual/ritual-size-s.webp',
    previewImgAlt: 'Девушка в комнате со свечами.',
    coverImg: 'img/content/ritual/ritual-size-m@2x.jpg',
    coverImgWebp: 'img/content/ritual/ritual-size-s@2x.webp',
    coverImgAlt: 'Комната со свечами и мистическим реквизитом.',
    level: 'Лёгкий',
    peopleMinCount: 3,
    peopleMaxCount: 5,
  },
];

export {QUESTS};
export type {QuestPreview};
