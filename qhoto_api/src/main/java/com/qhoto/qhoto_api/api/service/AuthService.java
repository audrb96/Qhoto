package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.UserRepository;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.response.AccessTokenRes;
import com.qhoto.qhoto_api.exception.ExpiredRefreshTokenException;
import com.qhoto.qhoto_api.exception.NoUserByRefreshTokenException;
import com.qhoto.qhoto_api.util.JwtTokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider tokenProvider;

    public AccessTokenRes reissue(String bearerToken) {
        // 1. Validation Refresh Token
        String oldRefreshToken = tokenProvider.resolveToken(bearerToken);

        // 2. 유저정보 얻기
        User user = userRepository.findByRefreshToken(oldRefreshToken).orElseThrow(()-> new NoUserByRefreshTokenException("토큰을 가진 유저가 없습니다."));
        
        if (tokenProvider.validateToken(oldRefreshToken)) {
            // 토큰이 만료되지 않았을 때
            String accessToken = tokenProvider.createAccessToken(user.getEmail(), user.getAuthorities());
            String refreshToken = tokenProvider.createRefreshToken();
            userRepository.updateRefreshToken(user.getId(), refreshToken);

            return new AccessTokenRes(accessToken,refreshToken);
        } else {
            // 토큰이 만료 되었을 때
            throw new ExpiredRefreshTokenException("refresh 토큰이 만료되었습니다.");
        }
    }
}