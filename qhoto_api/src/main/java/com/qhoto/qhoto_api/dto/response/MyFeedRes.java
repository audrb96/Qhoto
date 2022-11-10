package com.qhoto.qhoto_api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyFeedRes {

    private final Long feedId;
    private final String feedImage;
    private final String feedTime;
    private final String typeCode;
    private final String questName;

    public MyFeedRes(Long feedId, String feedImage, String feedTime, String typeCode, String questName) {
        this.feedId = feedId;
        this.feedImage = feedImage;
        this.feedTime = feedTime;
        this.typeCode = typeCode;
        this.questName = questName;
    }
}
