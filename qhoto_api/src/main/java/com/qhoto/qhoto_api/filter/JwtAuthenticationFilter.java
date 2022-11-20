package com.qhoto.qhoto_api.filter;

import com.qhoto.qhoto_api.exception.InvalidAccessTokenException;
import com.qhoto.qhoto_api.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
//JWT 검증 필터
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //Bearer Token parse
        String token = parseBearerToken(request);
        //Validation Access Token
        if (StringUtils.hasText(token) && tokenProvider.validateToken(token)) {
            //Token 검증 성공
            //Token에서 authentication 가져오기
            Authentication authentication = tokenProvider.getAuthentication(token);
            //Spring Security Session에 authentication 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.debug(authentication.getName() + "의 인증정보 저장");
        } else {
            log.debug("유효한 JWT 토큰이 없습니다.");
            throw new InvalidAccessTokenException("Invalid Access Token");
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Bearer 토큰 parse method
     * @param request
     * @return {@link String}
     */
    private String parseBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}