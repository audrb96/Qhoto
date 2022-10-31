package com.qhoto.qhoto_api.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@ToString
public class FeedAllReq {

    @NotNull
    private final String condition;

    @NotNull
    private final String duration;

    @Builder
    public FeedAllReq(String condition, String duration) {
        this.condition = condition;
        this.duration = duration;
    }
}
