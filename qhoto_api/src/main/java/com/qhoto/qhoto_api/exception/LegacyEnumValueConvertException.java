package com.qhoto.qhoto_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
// Enum RegacyCode Convert Exception
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class LegacyEnumValueConvertException extends RuntimeException {
    public LegacyEnumValueConvertException(String message) {
        super(message);
    }
}
