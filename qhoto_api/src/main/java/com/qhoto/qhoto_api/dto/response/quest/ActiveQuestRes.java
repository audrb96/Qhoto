package com.qhoto.qhoto_api.dto.response.quest;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ActiveQuestRes {
    private final Long activeId;
    private final Long questId;
    private final Integer difficulty;
    private final String questName;
    private final Integer score;
    private final String code;
}
