import type {QuestCategoryValue, QuestDifficultyValue} from '../const';

type QuestPreviewDto = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: QuestDifficultyValue;
  type: QuestCategoryValue;
  peopleMinMax: [number, number];
};

type QuestDto = QuestPreviewDto & {
  description: string;
  coverImg: string;
  coverImgWebp: string;
};

export type {QuestDto, QuestPreviewDto};
