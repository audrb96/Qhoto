package com.qhoto.qhoto_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.)
public class InvalidIdTokenException extends RuntimeException {
    public InvalidIdTokenException(String message) {
        super(message);
    }
}
