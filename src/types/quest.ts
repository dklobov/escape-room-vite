import type {QuestLevelValue, QuestTypeValue} from '../const';

type Quest = {
  id: string;
  title: string;
  type: QuestTypeValue;
  typeLabel: string;
  description: string;
  previewImg: string;
  previewImgWebp: string;
  previewImgAlt: string;
  coverImg: string;
  coverImgWebp: string;
  coverImgAlt: string;
  level: QuestLevelValue;
  levelLabel: string;
  peopleMinCount: number;
  peopleMaxCount: number;
};

export type {Quest};
