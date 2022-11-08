package com.qhoto.qhoto_api.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FeedFriendDto {
    private final Long feedId;
    private final Long userId;
    private final String userImage;
    private final String feedImage;
    private final LocalDateTime feedTime;
    private final String questName;
    private final String questType;
    private final int questPoint;
    private final int expPoint;
    private final String likeStatus;
    private final Long likeCount;

    private final String nickname;
    private final LocalDateTime time;
    private final String context;



    @QueryProjection
    @Builder
    public FeedFriendDto(Long feedId, Long userId, String feedImage, LocalDateTime feedTime, String questName, String questType, int questPoint, int expPoint, String likeStatus, Long likeCount, String nickname, String userImage, LocalDateTime time, String context) {
        this.feedId = feedId;
        this.userId = userId;
        this.feedImage = feedImage;
        this.feedTime = feedTime;
        this.questName = questName;
        this.questType = questType;
        this.questPoint = questPoint;
        this.expPoint = expPoint;
        this.likeStatus = likeStatus;
        this.likeCount = likeCount;
        this.nickname = nickname;
        this.userImage = userImage;
        this.time = time;
        this.context = context;
    }
}