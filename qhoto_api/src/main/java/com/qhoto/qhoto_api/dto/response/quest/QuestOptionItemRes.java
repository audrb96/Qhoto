package com.qhoto.qhoto_api.dto.response.quest;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuestOptionItemRes {
    private final Long questId;
    private final Long activeQuestId;
    private final String questName;
    private final String questType;
}
