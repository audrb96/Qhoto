package com.qhoto.qhoto_api.dto.request;

import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@ToString
public class FeedAllReq {

    @NotNull(message = "조건을 입력 해주세요")
    private final String condition;

    @NotNull(message = "기간을 입력 해주세요.")
    private final String duration;


    public FeedAllReq(String condition, String duration) {
        this.condition = condition;
        this.duration = duration;
    }
}
