package com.qhoto.qhoto_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
// 해당 닉네임을 사용하는 사용자가 없을 때 Exception
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class NoUserByNickNameException extends RuntimeException{
    public NoUserByNickNameException(String message){
        super(message);
    }
}
