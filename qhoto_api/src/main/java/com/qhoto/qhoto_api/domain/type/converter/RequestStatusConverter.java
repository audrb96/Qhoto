package com.qhoto.qhoto_api.domain.type.converter;

import com.qhoto.qhoto_api.domain.type.RequestStatus;

import javax.persistence.Converter;

@Converter
public class RequestStatusConverter extends AbstractLegacyEnumAttributeConverter<RequestStatus>{
    private static final String ENUM_NAME = "친구 요청 상태";

    public RequestStatusConverter() {
        super(RequestStatus.class, false, ENUM_NAME);
    }
}