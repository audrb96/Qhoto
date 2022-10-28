package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.UserRepository;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.response.AccessTokenRes;
import com.qhoto.qhoto_api.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider tokenProvider;

    public AccessTokenRes reissue(String bearerToken) {
        // 1. Validation Refresh Token
        String oldAccessToken = tokenProvider.resolveToken(bearerToken);

        // 2. 유저정보 얻기
        Authentication authentication = tokenProvider.getAuthentication(oldAccessToken);
        User user = (User) authentication.getPrincipal();

        Long id = user.getId();

        // 3. Match Refresh Token
        String savedToken = userRepository.getRefreshTokenById(id);

        if (tokenProvider.validateToken(savedToken)) {
            String accessToken = tokenProvider.createAccessToken(user.getEmail(), user.getAuthorities());
            String refreshToken = tokenProvider.createRefreshToken();
            userRepository.updateRefreshToken(user.getId(), refreshToken);

            return new AccessTokenRes(accessToken);
        } else {
            throw new RuntimeException("refresh 토큰이 만료되었습니다.");
        }
    }
}