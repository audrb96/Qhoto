package com.qhoto.qhoto_api.dto.response.feed;

import com.qhoto.qhoto_api.domain.type.FeedType;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

@Getter
public class FeedAllDto {

    private final Long feedId;
    private final String feedImage;
    private final FeedType feedType;


    @QueryProjection
    @Builder
    public FeedAllDto(Long feedId, String feedImage, FeedType feedType){
        this.feedId = feedId;
        this.feedImage = feedImage;
        this.feedType = feedType;
    }


}
