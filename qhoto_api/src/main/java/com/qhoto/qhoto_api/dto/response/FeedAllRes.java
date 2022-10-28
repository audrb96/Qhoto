package com.qhoto.qhoto_api.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class FeedAllRes {

    private final List<FeedAllDto> dayQuestList;
    private final List<FeedAllDto> weekQuestList;
    private final List<FeedAllDto> monthQuestList;


    @Builder
    public FeedAllRes(List<FeedAllDto> dayQuestList, List<FeedAllDto> weekQuestList, List<FeedAllDto> monthQuestList) {
        this.dayQuestList = dayQuestList;
        this.weekQuestList = weekQuestList;
        this.monthQuestList = monthQuestList;
    }
}
