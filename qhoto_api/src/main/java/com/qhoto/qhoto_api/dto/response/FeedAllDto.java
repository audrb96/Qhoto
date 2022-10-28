package com.qhoto.qhoto_api.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

@Getter
public class FeedAllDto {

    private final Long feedId;
    private final String feedImage;

    @QueryProjection
    @Builder
    public FeedAllDto(Long feedId, String feedImage){
        this.feedId = feedId;
        this.feedImage = feedImage;
    }


}
