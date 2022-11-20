package com.qhoto.qhoto_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
// 사용자를 찾을 수 없을 때 Exception
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class NotFoundUserException extends RuntimeException {
    public NotFoundUserException(String message) {
        super(message);
    }
}
