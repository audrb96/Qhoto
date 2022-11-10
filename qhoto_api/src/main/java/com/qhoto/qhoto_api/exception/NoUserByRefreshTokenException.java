package com.qhoto.qhoto_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
// refreshToken에 맞는 유저가 없을 때 Exception
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class NoUserByRefreshTokenException extends RuntimeException {
    public NoUserByRefreshTokenException(String message) {
        super(message);
    }
}
