package com.qhoto.qhoto_api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
@AllArgsConstructor
public class QuestOptionRes {
    private Map<String, Object> options;
}
