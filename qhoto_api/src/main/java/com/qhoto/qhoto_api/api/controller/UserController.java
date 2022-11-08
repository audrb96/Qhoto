package com.qhoto.qhoto_api.api.controller;

import com.qhoto.qhoto_api.api.service.LoginService;
import com.qhoto.qhoto_api.api.service.UserService;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.ModifyUserReq;
import com.qhoto.qhoto_api.dto.response.LoginRes;
import com.qhoto.qhoto_api.dto.response.MyInfoRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {
    private final LoginService loginService;
    private final UserService userService;


    @PostMapping("/login/google")
    public ResponseEntity<LoginRes> googleLogin(@RequestBody Map<String,String> idToken) throws GeneralSecurityException, IOException {
        LoginRes loginRes = loginService.loginGoogle(idToken.get("idToken"));
        return new ResponseEntity<>(loginRes, HttpStatus.OK);
    }

    @PostMapping("/login/kakao")
    public ResponseEntity<LoginRes> kakaoLogin(@RequestBody Map<String, String> kakaoToken) {
        LoginRes loginRes = loginService.loginKakao(kakaoToken.get("accessToken"));
        return new ResponseEntity<>(loginRes, HttpStatus.OK);
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<MyInfoRes> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.myInfo(user));
    }

    @GetMapping("/info/{userId}")
    public ResponseEntity<?> readUserInfo(@PathVariable Long userId){
        return ResponseEntity.ok(userService.getUserInfo(userId));
    }

    @PutMapping("/user")
    public ResponseEntity<String> modifyUser(@AuthenticationPrincipal User user, @Validated ModifyUserReq modifyUserReq) throws IOException {
        userService.modifyUser(modifyUserReq, user);
        return ResponseEntity.ok().body("success");
    }
    @GetMapping("/mypage")
    public ResponseEntity<?> readMyFeed(@AuthenticationPrincipal User user){
        return new ResponseEntity<>(userService.getMyFeed(user),HttpStatus.OK);
    }

    @GetMapping("/valid/{nickname}")
    public ResponseEntity<Boolean> validUser(@PathVariable String nickname){
        return new ResponseEntity<>(userService.confirmUser(nickname),HttpStatus.OK);
    }

}
