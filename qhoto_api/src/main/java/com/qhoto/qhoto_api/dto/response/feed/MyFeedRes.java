package com.qhoto.qhoto_api.dto.response.feed;

import com.qhoto.qhoto_api.domain.type.FeedType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyFeedRes {

    private final Long feedId;
    private final String feedImage;
    private final FeedType feedType;
    private final String feedTime;
    private final String typeCode;
    private final String questName;

    public MyFeedRes(Long feedId, String feedImage, FeedType feedType, String feedTime, String typeCode, String questName) {
        this.feedId = feedId;
        this.feedImage = feedImage;
        this.feedType = feedType;
        this.feedTime = feedTime;
        this.typeCode = typeCode;
        this.questName = questName;
    }
}
