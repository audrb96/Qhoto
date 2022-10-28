package com.qhoto.qhoto_api.api.controller;

import com.qhoto.qhoto_api.api.service.AuthService;
import com.qhoto.qhoto_api.dto.response.AccessTokenRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/reissue")
    public ResponseEntity<AccessTokenRes> reissueToken(HttpServletRequest request) {
        return ResponseEntity.ok().body(authService.reissue(request.getHeader("Authorization")));
    }
}
