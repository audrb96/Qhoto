package com.qhoto.qhoto_api.domain.type;

public enum UserRole {
    ROLE_USER("일반 사용자");

    private String value;
    UserRole(String value) {
        this.value = value;
    }
}
