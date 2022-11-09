package com.qhoto.qhoto_api.dto.response;

import com.qhoto.qhoto_api.domain.type.FeedType;
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
    private final String feedTime;
    private final String questName;
    private final String questType;
    private final int questPoint;
    private final int expPoint;
    private final String likeStatus;
    private final Long likeCount;

    private final String nickname;
    private final String commentNickname;
    private final String commentUserImage;
    private final String time;
    private final String context;
    private final FeedType feedType;


    @QueryProjection
    @Builder
    public FeedFriendDto(Long feedId, Long userId, String feedImage, String feedTime, String questName, String questType, int questPoint, int expPoint, String likeStatus, Long likeCount, String nickname, String commentNickname, String commentUserImage, String userImage, String time, String context, FeedType feedType) {
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
        this.commentNickname = commentNickname;
        this.commentUserImage = commentUserImage;
        this.userImage = userImage;
        this.time = time;
        this.context = context;
        this.feedType = feedType;
    }
}
