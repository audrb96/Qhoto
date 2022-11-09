package com.qhoto.qhoto_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
//id값에 맞는 퀘스트가 없을 때 Exception
@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class NoQuestByIdException extends RuntimeException{

    public NoQuestByIdException(String message){
        super(message);
    }
}
