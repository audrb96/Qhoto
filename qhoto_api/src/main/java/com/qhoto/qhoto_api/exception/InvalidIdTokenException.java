package com.qhoto.qhoto_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

//google idToken validation 실패 Exception
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class InvalidIdTokenException extends RuntimeException {
    public InvalidIdTokenException(String message) {
        super(message);
    }
}
