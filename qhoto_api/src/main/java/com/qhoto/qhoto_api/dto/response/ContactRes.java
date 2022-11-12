package com.qhoto.qhoto_api.dto.response;

import com.qhoto.qhoto_api.domain.type.RequestStatus;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;

@Data
public class ContactRes {

    private final Long userId;
    private final String name;
    private final String nickname;
    private final String image;
    private final RequestStatus isFriend;
    private final String grade;

    @QueryProjection
    @Builder
    public ContactRes(Long userId, String name, String nickname, String image, RequestStatus isFriend, String grade) {
        this.userId = userId;
        this.name = name;
        this.nickname = nickname;
        this.image = image;
        this.isFriend = isFriend;
        this.grade = grade;
    }


}
