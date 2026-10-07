type QuestPreview = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  previewImgAlt: string;
  level: string;
  peopleMinCount: number;
  peopleMaxCount: number;
};

const QUESTS: QuestPreview[] = [
  {
    id: 'crypt',
    title: 'Склеп',
    previewImg: 'img/content/crypt/crypt-size-s.jpg',
    previewImgWebp: 'img/content/crypt/crypt-size-s.webp',
    previewImgAlt: 'Мужчина в клетке в подземелье.',
    level: 'Сложный',
    peopleMinCount: 2,
    peopleMaxCount: 5,
  },
  {
    id: 'maniac',
    title: 'Маньяк',
    previewImg: 'img/content/maniac/maniac-size-s.jpg',
    previewImgWebp: 'img/content/maniac/maniac-size-s.webp',
    previewImgAlt: 'Мужчина в маске в тёмном переходе.',
    level: 'Средний',
    peopleMinCount: 3,
    peopleMaxCount: 6,
  },
  {
    id: 'ritual',
    title: 'Ритуал',
    previewImg: 'img/content/ritual/ritual-size-s.jpg',
    previewImgWebp: 'img/content/ritual/ritual-size-s.webp',
    previewImgAlt: 'Девушка в комнате со свечами.',
    level: 'Лёгкий',
    peopleMinCount: 3,
    peopleMaxCount: 5,
  },
];

export {QUESTS};
export type {QuestPreview};
