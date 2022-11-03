package com.qhoto.qhoto_api.exception.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {
    INVALID_INPUT_VALUE(400, "C001", "Invalid Input Value"),
    INTER_SERVER_ERROR(500,"C002", "Internal server error"),
    NOTNULL_INPUT_VALUE(400,"C003", "NotNull input value"),
    INVALID_PATTERN(400, "C004", "Invalid Pattern"),
    NO_REQUEST_BODY(400,"C004", "No Request Body"),
    //user
    INVALID_GOOGLE_TOKEN(400,"U001", "Invalid Google Token"),
    INVALID_ACCESS_TOKEN(401, "U002", "Invalid Access Token"),
    NOT_FOUND_USER(500, "U003", "No User By UserId"),
    //feed
    NO_FEED_BY_ID(500, "F001", "No Feed By FeedId"),
    NO_USER_BY_ID(500, "F002", "No User By UserId")
    ;

    private final int status;
    private final String code;
    private final String message;

}
