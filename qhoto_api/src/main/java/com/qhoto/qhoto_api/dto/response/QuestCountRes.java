package com.qhoto.qhoto_api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class QuestCountRes {
    private String typeCode;
    private String duration;
    private int count;
    private int sumPoint;


//    @Builder
//    public QuestCountRes(String typeCode, String duration, int count) {
//        this.typeCode = typeCode;
//        this.duration = duration;
//        this.count = count;
//    }


    @Builder
    public QuestCountRes(String typeCode, Long sumPoint) {
        this.typeCode = typeCode;
        this.sumPoint = sumPoint.intValue();
    }
}
