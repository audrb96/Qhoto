package com.qhoto.qhoto_api.exception.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {
    INVALID_INPUT_VALUE(400, "C001", "Invalid Input Value"),

    //user
    INVALID_GOOGLE_TOKEN(400,"U001", "Invalid Google Token")
    ;

    private final int status;
    private final String code;
    private final String message;


}
