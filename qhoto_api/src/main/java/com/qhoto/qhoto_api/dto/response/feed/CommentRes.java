package com.qhoto.qhoto_api.dto.response.feed;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class CommentRes {

    private final Long userId;
    private final String nickname;
    private final String userImage;
    private final String commentContext;
    private final String commentTime;

}
