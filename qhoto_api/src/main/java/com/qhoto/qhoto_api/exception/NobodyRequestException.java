package com.qhoto.qhoto_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
//RequestBody가 없을 때 Exception
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class NobodyRequestException extends RuntimeException {
    public NobodyRequestException(String message) {
        super(message);
    }
}
