package com.qhoto.qhoto_api.domain.type;

public enum feedStatus {
    U("사용"), D("삭제");

    private String value;

    feedStatus(String value) {
        this.value = value;
    }
}
