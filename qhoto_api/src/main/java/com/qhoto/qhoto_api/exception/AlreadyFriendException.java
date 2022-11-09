package com.qhoto.qhoto_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
//이미 친구 요청한 상태일때 Exception
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class AlreadyFriendException extends RuntimeException {
    public AlreadyFriendException(String message) {
        super(message);
    }
}
