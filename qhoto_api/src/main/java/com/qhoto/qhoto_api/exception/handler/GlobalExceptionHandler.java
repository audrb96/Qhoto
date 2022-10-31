package com.qhoto.qhoto_api.exception.handler;

import com.qhoto.qhoto_api.dto.response.ErrorResponse;
import com.qhoto.qhoto_api.exception.type.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.net.BindException;
import java.security.InvalidParameterException;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(BindException.class)
    protected ResponseEntity<ErrorResponse> handleInvalidParameterException(BindException e) {
        log.error("handleInvalidParameterException", e);
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.INVALID_INPUT_VALUE);
        return new ResponseEntity<>(errorResponse, HttpStatus.resolve(errorResponse.getStatus()));
    }
}
