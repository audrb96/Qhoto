package com.qhoto.qhoto_api.domain;

import lombok.Getter;

@Getter
public enum AuthProvider {
    GOOGLE("google"),
    KAKAO("kakao");

    private final String value;

    AuthProvider(String value) {
        this.value = value;
    }
}
