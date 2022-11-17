package com.qhoto.qhoto_api.dto.response.quest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class IsClearRes {
    private final boolean isClear;
}
