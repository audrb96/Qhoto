package com.qhoto.qhoto_api.domain.type;

public enum FeedStatus {
    U("사용"), D("삭제");

    private String value;

    FeedStatus(String value) {
        this.value = value;
    }
}
