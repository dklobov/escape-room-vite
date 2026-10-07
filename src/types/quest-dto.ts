import type {QuestLevelValue, QuestTypeValue} from '../const';

type QuestPreviewDto = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestLevelValue;
  type: QuestTypeValue;
  peopleMinMax: [number, number];
};

type QuestDto = QuestPreviewDto & {
  description: string;
  coverImg: string;
  coverImgWebp: string;
};

export type {QuestDto, QuestPreviewDto};
