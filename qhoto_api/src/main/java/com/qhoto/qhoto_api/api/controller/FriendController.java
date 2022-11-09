package com.qhoto.qhoto_api.api.controller;

import com.qhoto.qhoto_api.api.service.FriendService;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.FriendRequestReq;
import com.qhoto.qhoto_api.dto.response.ErrorResponse;
import com.qhoto.qhoto_api.dto.response.FriendInfoRes;
import com.qhoto.qhoto_api.dto.response.FriendRes;
import com.qhoto.qhoto_api.exception.AlreadyFriendException;
import com.qhoto.qhoto_api.exception.AlreadyRequestException;
import com.qhoto.qhoto_api.exception.type.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 친구 api
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/friend")
public class FriendController {

    private final FriendService friendService;

    /**
     * 친구 요청 api
     * @param user
     * @param friendRequestReq
     * @return {@link String}
     */
    @PostMapping
    public ResponseEntity<String> requestFriend(@AuthenticationPrincipal User user, @RequestBody FriendRequestReq friendRequestReq) {
        friendService.friendRequest(friendRequestReq, user);
        return ResponseEntity.ok("request success");
    }

    /**
     * 이미 요청한 친구 요청일 경우 Exception handler
     * @param e
     * @return {@link ErrorResponse}
     */
    @ExceptionHandler(AlreadyRequestException.class)
    protected ResponseEntity<ErrorResponse>  alreadyRequestException(AlreadyRequestException e) {
      log.error("AlreadyRequestException", e);
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.ALREADY_REQUEST_USER);
        return new ResponseEntity<>(errorResponse, HttpStatus.resolve(errorResponse.getStatus()));
    }

    /**
     * 이미 친구인 경우 Exception handler
     * @param e
     * @return {@link ErrorResponse}
     */
    @ExceptionHandler(AlreadyFriendException.class)
    protected ResponseEntity<ErrorResponse> alreadyFriendException(AlreadyFriendException e) {
        log.error("AlreadyFriendException",e);
        ErrorResponse errorResponse = ErrorResponse.of(ErrorCode.ALREADY_FRIEND);
        return new ResponseEntity<>(errorResponse, HttpStatus.resolve(errorResponse.getStatus()));
    }

    /**
     * 친구 목록 api
     * @param user
     * @return {@link List<FriendRes>}
     */
    @GetMapping
    public ResponseEntity<List<FriendRes>> readFriends(@AuthenticationPrincipal User user){
        return new ResponseEntity<>(friendService.getFriends(user),HttpStatus.OK);
    }

    /**
     * 내가 받은 요청 확인 api
     * @param user
     * @return
     */
    @GetMapping("/receive")
    public ResponseEntity<List<FriendRes>> readReceives(@AuthenticationPrincipal User user){
        return new ResponseEntity<>(friendService.getReceives(user), HttpStatus.OK);
    }

    /**
     * 닉네임으로 유저 감색
     * @param user
     * @param nickName
     * @return {@link FriendInfoRes}
     */
    @GetMapping("/find/{nickName}")
    public ResponseEntity<FriendInfoRes> readUsers(@AuthenticationPrincipal User user, @PathVariable String nickName) {
        FriendInfoRes friend = friendService.getUserByNickName(user, nickName);
        return new ResponseEntity<>(friend, HttpStatus.OK);
    }

    /**
     *
     * @param user
     * @param userId
     * @return {@link HttpStatus}
     */
    @PostMapping("/disconnect/{userId}")
    public ResponseEntity<HttpStatus> updateConnection(@AuthenticationPrincipal User user, @PathVariable Long userId){
        friendService.putConnection(user, userId);
        return ResponseEntity.ok().build();
    }

}
