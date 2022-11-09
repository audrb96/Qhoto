package com.qhoto.qhoto_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
//id에 맞는 사용자가 없을 때 Exception
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class NoUserByIdException extends RuntimeException {
    public NoUserByIdException(String message){
        super(message);
    }

}
