import type {QuestLevelValue, QuestTypeValue} from '../const';

type QuestPreview = {
  id: string;
  title: string;
  type: QuestTypeValue;
  typeLabel: string;
  previewImg: string;
  previewImgWebp: string;
  previewImgAlt: string;
  level: QuestLevelValue;
  levelLabel: string;
  peopleMinCount: number;
  peopleMaxCount: number;
};

type Quest = QuestPreview & {
  description: string;
  coverImg: string;
  coverImgWebp: string;
  coverImgAlt: string;
};

export type {Quest, QuestPreview};
