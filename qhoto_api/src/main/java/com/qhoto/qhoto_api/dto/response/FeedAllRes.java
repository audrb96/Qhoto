package com.qhoto.qhoto_api.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class FeedAllRes {

    private final List<FeedAllDto> questList;

    @Builder
    public FeedAllRes(List<FeedAllDto> questList) {
        this.questList = questList;
    }
}
