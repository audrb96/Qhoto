package com.qhoto.qhoto_api.dto.response.feed;


import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CommentRes {

    private final Long userId;
    private final String nickName;
    private final String commentContext;
    private final LocalDateTime commentTime;


    public CommentRes(Long userId, String nickName, String commentContext, LocalDateTime commentTime) {
        this.userId = userId;
        this.nickName = nickName;
        this.commentContext = commentContext;
        this.commentTime = commentTime;
    }
}
