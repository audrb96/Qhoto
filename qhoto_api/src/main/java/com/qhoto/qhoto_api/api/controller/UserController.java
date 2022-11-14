package com.qhoto.qhoto_api.api.controller;

import com.qhoto.qhoto_api.api.service.LoginService;
import com.qhoto.qhoto_api.api.service.UserService;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.ModifyUserReq;
import com.qhoto.qhoto_api.dto.response.user.ContactResSet;
import com.qhoto.qhoto_api.dto.response.user.LoginRes;
import com.qhoto.qhoto_api.dto.response.feed.MyFeedRes;
import com.qhoto.qhoto_api.dto.response.user.MyInfoRes;
import com.qhoto.qhoto_api.dto.response.user.UserInfoRes;
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
import java.util.List;
import java.util.Map;

/**
 * 회원 컨트롤러
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {
    private final LoginService loginService;
    private final UserService userService;

    /**
     * 구글 로그인 api
     * @param idToken
     * @return {@link LoginRes}
     * @throws GeneralSecurityException
     * @throws IOException
     */
    @PostMapping("/login/google")
    public ResponseEntity<LoginRes> googleLogin(@RequestBody Map<String,String> idToken) throws GeneralSecurityException, IOException {
        LoginRes loginRes = loginService.loginGoogle(idToken.get("idToken"));
        return new ResponseEntity<>(loginRes, HttpStatus.OK);
    }

    /**
     * 카카오 로그인 api
     * @param kakaoToken
     * @return {@link LoginRes}
     */
    @PostMapping("/login/kakao")
    public ResponseEntity<LoginRes> kakaoLogin(@RequestBody Map<String, String> kakaoToken) {
        LoginRes loginRes = loginService.loginKakao(kakaoToken.get("accessToken"));
        return new ResponseEntity<>(loginRes, HttpStatus.OK);
    }

    /**
     * 내 정보 확인 api
     * @param user
     * @return {@link MyInfoRes}
     */
    @GetMapping("/me")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<MyInfoRes> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.myInfo(user));
    }

    @GetMapping("/user/quest/{userId}")
    public ResponseEntity<List<MyFeedRes>> readUserFeed(@PathVariable Long userId){
        return ResponseEntity.ok(userService.getUserFeed(userId));
    }


    /**
     * 회원 정보 확인 api
     * @param userId
     * @return {@link UserInfoRes}
     * @throws IOException
     */
    @GetMapping("/info/{userId}")
    public ResponseEntity<UserInfoRes> readUserInfo(@PathVariable Long userId){
        return ResponseEntity.ok(userService.getUserInfo(userId));
    }

    /**
     * 회원정보 수정 api
     * @param user
     * @param modifyUserReq
     * @return {@link String}
     * @throws IOException
     */
    @PutMapping("/user")
    public ResponseEntity<String> modifyUser(@AuthenticationPrincipal User user, @Validated ModifyUserReq modifyUserReq) throws IOException {
        userService.modifyUser(modifyUserReq, user);
        return ResponseEntity.ok().body("success");
    }

    /**
     * 나의 피드 목록 확인 api
     * @return {@link List<MyFeedRes>}
     */
    @GetMapping("/mypage")
    public ResponseEntity<List<MyFeedRes>> readMyFeed(@AuthenticationPrincipal User user){
        return new ResponseEntity<>(userService.getMyFeed(user),HttpStatus.OK);
    }

    /**
     * 닉네임이 유효한지 확인 api
     * @param nickname
     * @return {@link Boolean}
     */
    @GetMapping("/valid/{nickname}")
    public ResponseEntity<Boolean> validUser(@PathVariable String nickname){
        return new ResponseEntity<>(userService.confirmUser(nickname),HttpStatus.OK);
    }

    @PostMapping("/contact")
    public ResponseEntity<List<ContactResSet>> readUserContact(@AuthenticationPrincipal User user, @RequestBody Map<String, String> contacts) {
        return ResponseEntity.ok(userService.getUserContact(user, contacts));
    }


}
