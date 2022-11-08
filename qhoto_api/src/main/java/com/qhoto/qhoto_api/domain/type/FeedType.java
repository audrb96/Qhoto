package com.qhoto.qhoto_api.domain.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FeedType implements LegacyCommonType{
    VIDEO("비디오","V"), IMAGE("이미지","I");

    private final String desc;
    private final String legacyCode;

}
