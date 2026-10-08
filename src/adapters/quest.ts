import {
  QUEST_LEVEL_LABEL,
  QUEST_TYPE_LABEL,
} from '../const';
import type {Quest, QuestPreview} from '../types/quest';
import type {QuestDto, QuestPreviewDto} from '../types/quest-dto';

function adaptQuestPreviewToClient(quest: QuestPreviewDto): QuestPreview {
  const [peopleMinCount, peopleMaxCount] = quest.peopleMinMax;

  return {
    id: quest.id,
    title: quest.title,
    type: quest.type,
    typeLabel: QUEST_TYPE_LABEL[quest.type],
    previewImg: quest.previewImg,
    previewImgWebp: quest.previewImgWebp,
    previewImgAlt: `Изображение квеста ${quest.title}`,
    level: quest.level,
    levelLabel: QUEST_LEVEL_LABEL[quest.level],
    peopleMinCount,
    peopleMaxCount,
  };
}

function adaptQuestToClient(quest: QuestDto): Quest {
  return {
    ...adaptQuestPreviewToClient(quest),
    description: quest.description,
    coverImg: quest.coverImg,
    coverImgWebp: quest.coverImgWebp,
    coverImgAlt: `Обложка квеста ${quest.title}`,
  };
}

export {adaptQuestPreviewToClient, adaptQuestToClient};
