package com.qhoto.qhoto_api.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qhoto.qhoto_api.api.service.AuthService;
import com.qhoto.qhoto_api.dto.response.AccessTokenRes;
import com.qhoto.qhoto_api.dto.response.ErrorResponse;
import com.qhoto.qhoto_api.exception.ExpiredRefreshTokenException;
import com.qhoto.qhoto_api.exception.NoUserByRefreshTokenException;
import com.qhoto.qhoto_api.exception.type.ErrorCode;
import com.qhoto.qhoto_api.producer.AuthProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final ObjectMapper objectMapper;
    private final AuthProducer authProducer;
    private final RabbitTemplate rabbitTemplate;
    @PostMapping("/reissue")
    public ResponseEntity<AccessTokenRes> reissueToken(HttpServletRequest request) {
        authProducer.reissueSendTo(request.getHeader("Authorization"));
        String receiveToken = (String) rabbitTemplate.receiveAndConvert("AUTH_REISSUE");
        return ResponseEntity.ok().body(authService.reissue(receiveToken));
    }

    @ExceptionHandler(NoUserByRefreshTokenException.class)
    protected ResponseEntity<ErrorResponse> noUserByRefreshTokenException(NoUserByRefreshTokenException e) {
        log.error("NoUserByRefreshTokenException", e);
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.NO_USER_BY_REFRESH_TOKEN);
        return new ResponseEntity<>(errorResponse, HttpStatus.resolve(errorResponse.getStatus()));
    }

    @ExceptionHandler(ExpiredRefreshTokenException.class)
    protected ResponseEntity<ErrorResponse> expiredRefreshTokenException(ExpiredRefreshTokenException e) {
        log.error("ExpiredRefreshTokenException", e);
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.EXPIRED_REFRESH_TOKEN);
        return new ResponseEntity<>(errorResponse, HttpStatus.resolve(errorResponse.getStatus()));
    }
}
