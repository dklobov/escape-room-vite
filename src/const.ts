const AppRoute = {
  Main: '/',
  Login: '/login',
  Contacts: '/contacts',
  Quest: '/quest/:id',
  Booking: '/quest/:id/booking',
  MyQuests: '/my-quests',
  NotFound: '*',
} as const;

const ApiRoute = {
  Quest: '/quest',
  Quests: '/quest',
} as const;

const BASE_URL = 'https://grading.design.htmlacademy.pro/v1/escape-room';
const REQUEST_TIMEOUT = 5000;

const QuestType = {
  All: 'all',
  Adventures: 'adventures',
  Horror: 'horror',
  Mystic: 'mystic',
  Detective: 'detective',
  SciFi: 'sci-fi',
} as const;

const QuestLevel = {
  Any: 'any',
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
} as const;

const QUEST_TYPE_LABEL: Record<QuestCategoryValue, string> = {
  [QuestType.Adventures]: 'Приключения',
  [QuestType.Horror]: 'Ужасы',
  [QuestType.Mystic]: 'Мистика',
  [QuestType.Detective]: 'Детектив',
  [QuestType.SciFi]: 'Sci-fi',
} as const;

const QUEST_LEVEL_LABEL: Record<QuestDifficultyValue, string> = {
  [QuestLevel.Easy]: 'Лёгкий',
  [QuestLevel.Medium]: 'Средний',
  [QuestLevel.Hard]: 'Сложный',
} as const;

const QUEST_TYPE_FILTERS = [
  {
    type: QuestType.All,
    label: 'Все квесты',
    icon: 'icon-all-quests',
    iconWidth: 26,
  },
  {
    type: QuestType.Adventures,
    label: 'Приключения',
    icon: 'icon-adventure',
    iconWidth: 36,
  },
  {
    type: QuestType.Horror,
    label: 'Ужасы',
    icon: 'icon-horror',
    iconWidth: 30,
  },
  {
    type: QuestType.Mystic,
    label: 'Мистика',
    icon: 'icon-mystic',
    iconWidth: 30,
  },
  {
    type: QuestType.Detective,
    label: 'Детектив',
    icon: 'icon-detective',
    iconWidth: 40,
  },
  {
    type: QuestType.SciFi,
    label: 'Sci-fi',
    icon: 'icon-sci-fi',
    iconWidth: 28,
  },
] as const;

const QUEST_LEVEL_FILTERS = [
  {
    level: QuestLevel.Any,
    label: 'Любой',
  },
  {
    level: QuestLevel.Easy,
    label: 'Лёгкий',
  },
  {
    level: QuestLevel.Medium,
    label: 'Средний',
  },
  {
    level: QuestLevel.Hard,
    label: 'Сложный',
  },
] as const;

const AUTHORIZATION_STATUS_KEY = 'escape-room-authorization-status';

type QuestTypeValue = typeof QuestType[keyof typeof QuestType];
type QuestLevelValue = typeof QuestLevel[keyof typeof QuestLevel];
type QuestCategoryValue = Exclude<QuestTypeValue, typeof QuestType.All>;
type QuestDifficultyValue = Exclude<QuestLevelValue, typeof QuestLevel.Any>;

export {
  ApiRoute,
  AppRoute,
  AUTHORIZATION_STATUS_KEY,
  BASE_URL,
  QuestLevel,
  QuestType,
  QUEST_LEVEL_FILTERS,
  QUEST_LEVEL_LABEL,
  QUEST_TYPE_FILTERS,
  QUEST_TYPE_LABEL,
  REQUEST_TIMEOUT,
};

export type {
  QuestCategoryValue,
  QuestDifficultyValue,
  QuestLevelValue,
  QuestTypeValue,
};
