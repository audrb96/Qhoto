package com.qhoto.qhoto_api.dto.request;

import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@ToString
public class LikeReq {

    @NotNull
    private final Long feedId;
    @NotNull
    private final Long userId;

    public LikeReq(Long feedId, Long userId) {
        this.feedId = feedId;
        this.userId = userId;
    }
}
