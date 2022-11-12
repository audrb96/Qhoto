package com.qhoto.qhoto_api.domain.type.converter;

import com.qhoto.qhoto_api.domain.type.FeedStatus;

import javax.persistence.Converter;

@Converter
public class FeedStatusConverter extends AbstractLegacyEnumAttributeConverter<FeedStatus>{
    private static final String ENUM_NAME = "피드 상태";

    public FeedStatusConverter() {
        super(FeedStatus.class, false, ENUM_NAME);
    }
}
