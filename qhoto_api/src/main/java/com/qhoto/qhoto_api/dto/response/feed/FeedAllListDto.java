package com.qhoto.qhoto_api.dto.response.feed;


import com.qhoto.qhoto_api.dto.type.LikeStatus;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class FeedAllListDto {
    private final Long feedId;
    private final String feedImage;
    private final LocalDateTime feedTime;
    private final String questName;
    private final String questType;
    private final int questPoint;
    private final LikeStatus likeStatus;
    private final int likeCount;
    private final List<CommentRes> commentList;


    @QueryProjection
    @Builder
    public FeedAllListDto(Long feedId, String feedImage, LocalDateTime feedTime, String questName, String questType, int questPoint, LikeStatus likeStatus, int likeCount, List<CommentRes> commentList) {
        this.feedId = feedId;
        this.feedImage = feedImage;
        this.feedTime = feedTime;
        this.questName = questName;
        this.questType = questType;
        this.questPoint = questPoint;
        this.likeStatus = likeStatus;
        this.likeCount = likeCount;
        this.commentList = commentList;
    }
}
