package com.qhoto.qhoto_api.domain.type;

public enum CommentStatus {
    U("사용"), D("삭제");

    private String value;

    CommentStatus(String value) {
        this.value = value;
    }
}
