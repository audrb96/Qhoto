package com.qhoto.qhoto_api.domain.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum QuestDuration implements LegacyCommonType {
    DAY("일간","D"), WEEK("주간","W"), MONTH("월간","M");

    private final String desc;
    private final String legacyCode;
}
