package com.qhoto.qhoto_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
//피드 id 값에 맞는 피드가 없을 때 Exception
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class NoFeedByIdException extends RuntimeException {
    public NoFeedByIdException(String message) {
        super(message);
    }
}
