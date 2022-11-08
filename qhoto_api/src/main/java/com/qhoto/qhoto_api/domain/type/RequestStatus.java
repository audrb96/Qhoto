package com.qhoto.qhoto_api.domain.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RequestStatus implements LegacyCommonType{
    REQUEST("요청 보낸 상태","R"), FRIEND("친구 상태","F"), DISCONNECTED("단절 상태","D"), GET("요청 받은 상태","G");

    private final String desc;
    private final String legacyCode;
}
