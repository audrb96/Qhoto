package com.qhoto.qhoto_api.exception.handler;

import com.qhoto.qhoto_api.dto.response.ErrorResponse;
import com.qhoto.qhoto_api.exception.NoFeedByIdException;
import com.qhoto.qhoto_api.exception.NotFoundUserException;
import com.qhoto.qhoto_api.exception.type.ErrorCode;
import com.qhoto.qhoto_api.exception.NoUserByIdException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {


    @ExceptionHandler(value = {MethodArgumentNotValidException.class, BindException.class})
    protected ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(BindException e, HttpServletRequest request) {
        log.error("handleMethodArgumentNotValidException", e);
        ErrorResponse errorResponse = makeErrorResponse(e.getBindingResult());

        return new ResponseEntity<>(errorResponse, HttpStatus.resolve(errorResponse.getStatus()));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    protected ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        log.error("handleHttpMessageNotReadableException", e);
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.NO_REQUEST_BODY);

        return new ResponseEntity<>(errorResponse, HttpStatus.resolve(errorResponse.getStatus()));
    }


    private ErrorResponse makeErrorResponse(BindingResult bindingResult) {
        String code = "";
        String message = "";
        int status = 0;

        if(bindingResult.hasErrors()) {
            message = bindingResult.getFieldError().getDefaultMessage();

            String bindResultCode = bindingResult.getFieldError().getCode();

            switch (bindResultCode) {
                case "NotNull" :
                    code = ErrorCode.NOTNULL_INPUT_VALUE.getCode();
                    status = ErrorCode.NOTNULL_INPUT_VALUE.getStatus();
                    break;
                case "Pattern" :
                    code = ErrorCode.INVALID_PATTERN.getCode();
                    status = ErrorCode.INVALID_PATTERN.getStatus();
                    break;
                case "TypeMismatch" :
                    code = ErrorCode.TYPE_MISMATCH_VALUE.getCode();
                    status = ErrorCode.TYPE_MISMATCH_VALUE.getStatus();
                    break;
            }
        }
        return new ErrorResponse(message, code, status );
    }

    @ExceptionHandler(NoFeedByIdException.class)
    protected ResponseEntity<ErrorResponse> noFeedByIdException(NoFeedByIdException e) {
        log.error("noFeedByIdException", e);
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.NO_FEED_BY_ID);
        return new ResponseEntity<>(errorResponse, HttpStatus.resolve(errorResponse.getStatus()));
    }

    @ExceptionHandler(NoUserByIdException.class)
    protected ResponseEntity<ErrorResponse> noUserByIdException(NoUserByIdException e){
        log.error("noUserByIdException", e);
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.NO_USER_BY_ID);
        return new ResponseEntity<>(errorResponse, HttpStatus.resolve(errorResponse.getStatus()));
    }

    @ExceptionHandler(NotFoundUserException.class)
    protected ResponseEntity<ErrorResponse> NotFoundUserException(NotFoundUserException e) {
        log.error("NotFoundUserException", e);
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.NOT_FOUND_USER);
        return new ResponseEntity<>(errorResponse, HttpStatus.resolve(errorResponse.getStatus()));
    }

}
