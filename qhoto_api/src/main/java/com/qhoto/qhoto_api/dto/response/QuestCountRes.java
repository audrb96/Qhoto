package com.qhoto.qhoto_api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class QuestCountRes {
    private String typeCode;
    private int sumPoint;


    @Builder
    public QuestCountRes(String typeCode, Long sumPoint) {
        this.typeCode = typeCode;
        this.sumPoint = sumPoint.intValue();
    }
}
