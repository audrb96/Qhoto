package com.qhoto.qhoto_api.domain.type.converter;

import com.qhoto.qhoto_api.domain.type.QuestDuration;

public class QuestDurationConverter extends AbstractLegacyEnumAttributeConverter<QuestDuration>{
    private static String ENUM_NAME = "퀘스트 기간";

    public QuestDurationConverter() {
        super(QuestDuration.class, false, ENUM_NAME);
    }
}
