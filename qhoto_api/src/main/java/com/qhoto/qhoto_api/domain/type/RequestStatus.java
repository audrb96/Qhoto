package com.qhoto.qhoto_api.domain.type;

public enum RequestStatus {
    R("요청 보낸 상태"), F("친구 상태"), D("단절 상태"), G("요청 받은 상태");

    private String value;

    RequestStatus(String value) {
        this.value = value;
    }
}
