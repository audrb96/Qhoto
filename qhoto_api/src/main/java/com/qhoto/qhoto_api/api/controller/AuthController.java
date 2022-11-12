package com.qhoto.qhoto_api.api.controller;

import com.qhoto.qhoto_api.api.service.AuthService;
import com.qhoto.qhoto_api.dto.response.AccessTokenRes;
import com.qhoto.qhoto_api.dto.response.ErrorResponse;
import com.qhoto.qhoto_api.exception.ExpiredRefreshTokenException;
import com.qhoto.qhoto_api.exception.NoUserByRefreshTokenException;
import com.qhoto.qhoto_api.exception.type.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Auth 컨트롤러
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    /**
     * JWT 토큰 재발급 컨트롤러
     * @param request
     * @return {@link AccessTokenRes}
     */
    @PostMapping("/reissue")
    public ResponseEntity<AccessTokenRes> reissueToken(HttpServletRequest request) {
        return ResponseEntity.ok().body(authService.reissue(request.getHeader("Authorization")));
    }

    /**
     * refreshToken에 해당하는 유저가 없을 때 Exception 처리 handler
     * @param e
     * @return {@link ErrorResponse}
     */
    @ExceptionHandler(NoUserByRefreshTokenException.class)
    protected ResponseEntity<ErrorResponse> noUserByRefreshTokenException(NoUserByRefreshTokenException e) {
        log.error("NoUserByRefreshTokenException", e);
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.NO_USER_BY_REFRESH_TOKEN);
        return new ResponseEntity<>(errorResponse, HttpStatus.resolve(errorResponse.getStatus()));
    }

    /**
     * refreshToken 만료 Exception
     * @param e
     * @return {@link ErrorResponse}
     */
    @ExceptionHandler(ExpiredRefreshTokenException.class)
    protected ResponseEntity<ErrorResponse> expiredRefreshTokenException(ExpiredRefreshTokenException e) {
        log.error("ExpiredRefreshTokenException", e);
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.EXPIRED_REFRESH_TOKEN);
        return new ResponseEntity<>(errorResponse, HttpStatus.resolve(errorResponse.getStatus()));
    }
}
