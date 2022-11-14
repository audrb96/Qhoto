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
    NO_REQUEST_BODY(400,"C005", "No Request Body"),
    TYPE_MISMATCH_VALUE(400,"C006", "TypeMismatch value"),
    //user
    INVALID_GOOGLE_TOKEN(400,"U001", "Invalid Google Token"),
    INVALID_ACCESS_TOKEN(401, "U002", "Invalid Access Token"),
    NOT_FOUND_USER(500, "U003", "No User By UserId"),
    NO_USER_BY_REFRESH_TOKEN(500, "U004", "No User By RefreshToken"),
    NO_USER_BY_NICKNAME(500, "U005", "No User By UserNickName"),
    NO_UNIQUE_USER(500,"U006", "No Unique User"),
    EXPIRED_REFRESH_TOKEN(500,"A001", "Expired Refresh Token"),
    //feed
    NO_FEED_BY_ID(500, "F001", "No Feed By FeedId"),
    NO_USER_BY_ID(500, "F002", "No User By UserId"),
    NO_QUEST_BY_ID(500, "F003","No Quest By QuestId"),
    ALREADY_REQUEST_USER(500,"F004", "Already Request User"),
    ALREADY_FRIEND(500,"F005","Already Friend"),
    NO_FEED_BY_USER_ID(500, "F006", "No Feed By UserId")
    ;

    private final int status;
    private final String code;
    private final String message;

}
