package com.qhoto.qhoto_api.api.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.qhoto.qhoto_api.api.repository.ExpRepository;
import com.qhoto.qhoto_api.api.repository.QuestTypeRepository;
import com.qhoto.qhoto_api.api.repository.UserRepository;
import com.qhoto.qhoto_api.domain.AuthProvider;
import com.qhoto.qhoto_api.domain.Exp;
import com.qhoto.qhoto_api.domain.QuestType;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.domain.type.UserRole;
import com.qhoto.qhoto_api.dto.response.LoginRes;
import com.qhoto.qhoto_api.exception.InvalidIdTokenException;
import com.qhoto.qhoto_api.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginService {
    private final UserRepository userRepository;
    private final ExpRepository expRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final QuestTypeRepository questTypeRepository;

    private final String CLIENT_ID = "1091823482731-f0375q139gm9me0a4v7cg50jiamjkcq4.apps.googleusercontent.com";

    public LoginRes loginGoogle(String idTokenString) throws GeneralSecurityException, IOException {
        HttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new JacksonFactory();
        User user;
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport,jsonFactory)
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();
        log.info("idToken = {}", idTokenString);
        GoogleIdToken idToken = verifier.verify(idTokenString);
        log.info("idToken = {}", idToken);

        if(idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();

            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");

            Optional<User> findUser = userRepository.findByEmail(email);
            String accessToken;
            String refreshToken;

            if(findUser.isPresent()) {
                user = findUser.get();
                accessToken = jwtTokenProvider.createAccessToken(email, user.getAuthorities());
                refreshToken = jwtTokenProvider.createRefreshToken();
                userRepository.updateRefreshToken(user.getId(), refreshToken);
            } else {
                user = createUser(email, name, pictureUrl);
                accessToken = jwtTokenProvider.createAccessToken(email, user.getAuthorities());
                refreshToken = jwtTokenProvider.createRefreshToken();
                user.insertRefreshToken(refreshToken);
                userRepository.save(user);
            }

            return LoginRes.builder()
                    .accessToken(accessToken)
                    .user(user)
                    .build();

        }
        else {
            throw new InvalidIdTokenException("TokenId is null.");
        }

    }

    private User createUser(String email, String name, String pictureUrl) {
        User user = User.builder()
                .authProvider(AuthProvider.GOOGLE)
                .contactAgree(false)
                .contactAgreeDate(null)
                .email(email)
                .image(pictureUrl)
                .joinDate(LocalDate.now(ZoneId.of("Asia/Seoul")))
                .name(name)
                .phone("010-0000-0000")
                .profileOpen(true)
                .roles(Collections.singletonList(UserRole.USER))
                .nickname("tempUser")
                .build();

        List<QuestType> questTypes = questTypeRepository.findAll();
        questTypes.forEach((questType) -> expRepository.save(Exp.builder()
                .user(user)
                .point(0)
                .questType(questType)
                .build()));

        return user;
    }

}
