package com.qhoto.qhoto_api.api.controller;

import com.qhoto.qhoto_api.api.service.FriendService;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.FriendRequestReq;
import com.qhoto.qhoto_api.dto.response.ErrorResponse;
import com.qhoto.qhoto_api.exception.AlreadyFriendException;
import com.qhoto.qhoto_api.exception.AlreadyRequestException;
import com.qhoto.qhoto_api.exception.type.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/friend")
public class FriendController {

    private final FriendService friendService;

    @PostMapping
    public ResponseEntity<String> requestFriend(@AuthenticationPrincipal User user, @RequestBody FriendRequestReq friendRequestReq) {
        friendService.friendRequest(friendRequestReq, user);
        return ResponseEntity.ok("request success");
    }

    @ExceptionHandler(AlreadyRequestException.class)
    protected ResponseEntity<ErrorResponse>  alreadyRequestException(AlreadyRequestException e) {
      log.error("AlreadyRequestException", e);
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.ALREADY_REQUEST_USER);
        return new ResponseEntity<>(errorResponse, HttpStatus.resolve(errorResponse.getStatus()));
    }

    @ExceptionHandler(AlreadyFriendException.class)
    protected ResponseEntity<ErrorResponse> alreadyFriendException(AlreadyFriendException e) {
        log.error("AlreadyFriendException",e);
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.ALREADY_FRIEND);
        return new ResponseEntity<>(errorResponse, HttpStatus.resolve(errorResponse.getStatus()));
    }


}
