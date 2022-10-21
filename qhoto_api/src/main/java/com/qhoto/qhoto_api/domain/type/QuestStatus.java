package com.qhoto.qhoto_api.domain.type;

public enum QuestStatus {
    A("사용가능"), D("사용불가");

    private String value;

    QuestStatus(String value) {
        this.value = value;
    }
}
