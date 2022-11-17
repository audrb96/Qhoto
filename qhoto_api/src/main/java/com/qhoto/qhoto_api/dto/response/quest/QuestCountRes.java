package com.qhoto.qhoto_api.dto.response.quest;

import lombok.Builder;
import lombok.Getter;

@Getter
public class QuestCountRes {
    private final String typeCode;
    private final int sumPoint;


    @Builder
    public QuestCountRes(String typeCode, Long sumPoint) {
        this.typeCode = typeCode;
        this.sumPoint = sumPoint.intValue();
    }
}
