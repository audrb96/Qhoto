package com.qhoto.qhoto_api.dto.request;

import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@ToString
public class LikeReq {

    @NotNull(message = "피드 아이디를 입력해주세요.")
    private final Long feedId;
    @NotNull(message = "유저 아이디를 입력해주세요.")
    private final Long userId;

    public LikeReq(Long feedId, Long userId) {
        this.feedId = feedId;
        this.userId = userId;
    }
}
