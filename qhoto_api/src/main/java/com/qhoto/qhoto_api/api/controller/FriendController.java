package com.qhoto.qhoto_api.api.controller;

import com.qhoto.qhoto_api.api.service.FriendService;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.FriendRequestReq;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    @PostMapping
    public ResponseEntity<?> requestFriend(@AuthenticationPrincipal User user, @RequestBody FriendRequestReq friendRequestReq) {
        friendService.friendRequest(friendRequestReq, user);
    }
}
