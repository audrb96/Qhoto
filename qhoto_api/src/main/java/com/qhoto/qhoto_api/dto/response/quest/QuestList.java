package com.qhoto.qhoto_api.dto.response.quest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
@AllArgsConstructor
public class QuestList {
    private Map<String, Object> questList;
}
