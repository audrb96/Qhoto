package com.qhoto.qhoto_api.util;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.*;
//JWT 토큰 Util
@Slf4j
@Component
public class JwtTokenProvider {
    private final String SECRET_KEY;
    private final Long ACCESS_TOKEN_EXPIRE_LENGTH = 1000L * 60 * 60;//1hour
    private final Long REFRESH_TOKEN_EXPIRE_LENGTH = 1000L * 60 * 60 * 24 * 7 * 4 * 12;// 1Year
    private final String AUTHORITIES_KEY = "role";

    private final UserDetailsService userDetailsService;

    public JwtTokenProvider(@Value("${app.auth.token.secret-key}") String SECRET_KEY,UserDetailsService userDetailsService) {
        this.SECRET_KEY = Base64.getEncoder().encodeToString(SECRET_KEY.getBytes());
        this.userDetailsService = userDetailsService;
    }
    //accessToken 생성
    public String createAccessToken(String email, Collection<? extends GrantedAuthority> userRole) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + ACCESS_TOKEN_EXPIRE_LENGTH);

        // email로 claim 추가
        Claims claims = Jwts.claims().setSubject(email);

        // 사용자 권한 추가
        claims.put(AUTHORITIES_KEY, userRole);

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setSubject(email)
                .setClaims(claims)
                .setIssuer("Qhoto")
                .setIssuedAt(now)
                .setExpiration(validity)
                .compact();
    }

    //refresh Token 생성
    public String createRefreshToken() {
        Date now = new Date();
        Date validity = new Date(now.getTime() + REFRESH_TOKEN_EXPIRE_LENGTH);

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .setIssuer("Qhoto")
                .setIssuedAt(now)
                .setExpiration(validity)
                .compact();
    }

    //Access Token을 검사하고 얻은 정보로 Authentication 객체 생성
    public Authentication getAuthentication(String accessToken) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPK(accessToken));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
    //accessToken으로 사용자 이메일 가져오는 메소드
    private String getUserPK(String accessToken) {
       return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(accessToken).getBody().getSubject();
    }

    //토큰 validation
    public Boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalStateException e) {
            log.info("JWT 토큰이 잘못되었습니다");
        }
        return false;
    }

    //토큰에서 Bearer 제거
    public String resolveToken(String bearerToken) {
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }


}
