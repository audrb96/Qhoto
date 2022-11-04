package com.qhoto.qhoto_api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserRes {
    private final Long userId;
    private final String isFriend;
    private final String nickName;
    private final String email;
    private final String profileImg;
    private final String point;
}
