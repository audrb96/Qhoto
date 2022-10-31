package com.qhoto.qhoto_api.exception.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {
    INVALID_INPUT_VALUE(400, "C001", "Invalid Input Value"),
    INTER_SERVER_ERROR(500,"C002", "internal server error"),
    //user
    INVALID_GOOGLE_TOKEN(400,"U001", "Invalid Google Token"),
    INVALID_ACCESS_TOKEN(401, "U002", "Invalid Access Token")
    ;

    private final int status;
    private final String code;
    private final String message;

}
