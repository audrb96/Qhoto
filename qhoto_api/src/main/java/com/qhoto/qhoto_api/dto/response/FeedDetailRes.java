package com.qhoto.qhoto_api.dto.response;

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
    private final String feedImage;
    private final LocalDateTime feedTime;
    private final String questName;
    private final String questType;
    private final int questPoint;
    private final LikeStatus likeStatus;
    private final int likeCount;
    private final List<CommentRes> commentList;


}
