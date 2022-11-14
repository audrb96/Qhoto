package com.qhoto.qhoto_api.dto.response.user;

import com.qhoto.qhoto_api.domain.type.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FriendInfoRes {
    private final Long userId;
    private RequestStatus isFriend;
    private final String nickName;
    private final String email;
    private final String profileImg;
    private final Long point;

    public void updateIsFriend(RequestStatus status) {
        this.isFriend = status;
    }
}
