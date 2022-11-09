package com.qhoto.qhoto_api.dto.response;

import com.qhoto.qhoto_api.domain.type.FeedType;
import com.qhoto.qhoto_api.dto.type.LikeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class FeedDetailRes {

    private final Long feedId;
    private final Long userId;
    private final String userImage;
    private final String nickName;
    private final String feedImage;
    private final LocalDateTime feedTime;
    private final String questName;
    private final String questType;
    private final int questPoint;
    private final int expPoint;
    private final LikeStatus likeStatus;
    private final int likeCount;
    private final List<CommentRes> commentList;
    private final FeedType feedType;


}
