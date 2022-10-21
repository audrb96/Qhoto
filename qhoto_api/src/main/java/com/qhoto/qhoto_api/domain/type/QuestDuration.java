package com.qhoto.qhoto_api.domain.type;

public enum QuestDuration {
    D("일간"), W("주간"), M("월간");

    private String value;

    QuestDuration(String value) {
        this.value = value;
    }
}
