package com.qhoto.qhoto_api.domain.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum QuestStatus implements LegacyCommonType{
    AVAILABLE("사용가능", "A"), DISABLE("사용불가", "D");

    private final String desc;
    private final String legacyCode;
}
