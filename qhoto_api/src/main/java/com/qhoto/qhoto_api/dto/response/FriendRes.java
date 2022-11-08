package com.qhoto.qhoto_api.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FriendRes {

    private final Long userId;
    private final String nickname;
    private final String userImage;

}
