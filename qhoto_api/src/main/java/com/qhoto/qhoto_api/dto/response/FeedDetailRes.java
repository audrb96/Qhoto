package com.qhoto.qhoto_api.dto.response;

import com.qhoto.qhoto_api.dto.type.LikeStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class FeedDetailRes {

    private final Long feedId;
    private final String feedImage;
    private final LocalDateTime feedTime;
    private final String questName;
    private final String questType;
    private final int questPoint;
    private final LikeStatus likeStatus;
    private final int likeCount;


    @Builder
    public FeedDetailRes(Long feedId, String feedImage, LocalDateTime feedTime, String questName, String questType, int questPoint, LikeStatus likeStatus, int likeCount) {
        this.feedId = feedId;
        this.feedImage = feedImage;
        this.feedTime = feedTime;
        this.questName = questName;
        this.questType = questType;
        this.questPoint = questPoint;
        this.likeStatus = likeStatus;
        this.likeCount = likeCount;
    }
}
