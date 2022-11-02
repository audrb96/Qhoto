package com.qhoto.qhoto_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class NoFeedByIdException extends RuntimeException {
    public NoFeedByIdException(String message) {
        super(message);
    }
}
