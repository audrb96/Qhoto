package com.qhoto.qhoto_api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuestOptionRes {
    private Long questId;
    private String questName;
    private String questType;
}
