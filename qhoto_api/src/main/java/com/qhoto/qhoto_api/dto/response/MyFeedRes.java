package com.qhoto.qhoto_api.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class MyFeedRes {

    private final Long feedId;
    private final String feedImage;
    private final LocalDateTime feedTime;
    private final String typeCode;
    private final String questName;

    public MyFeedRes(Long feedId, String feedImage, LocalDateTime feedTime, String typeCode, String questName) {
        this.feedId = feedId;
        this.feedImage = feedImage;
        this.feedTime = feedTime;
        this.typeCode = typeCode;
        this.questName = questName;
    }
}
