package com.qhoto.qhoto_api.dto.request;

import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@ToString
public class FeedAllReq {

    private final String condition;
    @NotNull
    private final String duration;


    public FeedAllReq(String condition, String duration) {
        this.condition = condition;
        this.duration = duration;
    }
}
