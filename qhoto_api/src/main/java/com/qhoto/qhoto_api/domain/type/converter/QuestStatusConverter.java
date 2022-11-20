package com.qhoto.qhoto_api.domain.type.converter;

import com.qhoto.qhoto_api.domain.type.QuestStatus;

import javax.persistence.Converter;

@Converter
public class QuestStatusConverter extends AbstractLegacyEnumAttributeConverter<QuestStatus>{
    private static final String ENUM_NAME = "퀘스트 상태";
    public QuestStatusConverter() {
        super(QuestStatus.class, false, ENUM_NAME);
    }
}
