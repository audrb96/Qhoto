package com.qhoto.qhoto_api.api.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.qhoto.qhoto_api.api.repository.ExpRepository;
import com.qhoto.qhoto_api.api.repository.QuestTypeRepository;
import com.qhoto.qhoto_api.api.repository.UserRepository;
import com.qhoto.qhoto_api.domain.AuthProvider;
import com.qhoto.qhoto_api.domain.Exp;
import com.qhoto.qhoto_api.domain.QuestType;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.domain.type.UserRole;
import com.qhoto.qhoto_api.dto.layer.KakaoTokenDto;
import com.qhoto.qhoto_api.dto.response.LoginRes;
import com.qhoto.qhoto_api.exception.InvalidIdTokenException;
import com.qhoto.qhoto_api.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginService {
    private final UserRepository userRepository;
    private final ExpRepository expRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final QuestTypeRepository questTypeRepository;

    private final String GOOGLE_CLIENT_ID = "1091823482731-f0375q139gm9me0a4v7cg50jiamjkcq4.apps.googleusercontent.com";
    private final String KAKAO_CLIENT_ID = "da1405216df329ccac214c6fcef3e087";

    public LoginRes loginGoogle(String idTokenString) throws GeneralSecurityException, IOException {
        HttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new JacksonFactory();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport,jsonFactory)
                .setAudience(Collections.singletonList(GOOGLE_CLIENT_ID))
                .build();
        log.info("idToken = {}", idTokenString);
        GoogleIdToken idToken = verifier.verify(idTokenString);
        log.info("idToken = {}", idToken);

        if(idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();

            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");

            Map<String, Object> userMap = isJoined(email, name, pictureUrl,AuthProvider.GOOGLE);

            return LoginRes.builder()
                    .accessToken((String) userMap.get("accessToken"))
                    .user((User) userMap.get("user"))
                    .build();

        }
        else {
            throw new InvalidIdTokenException("Google TokenId is null.");
        }
    }
    public LoginRes loginKakao(String kakaoAccessToken) {
        Map<String, String> userInfo = getUserInfo(kakaoAccessToken);

        String email = userInfo.get("email");
        String profileImage = userInfo.get("profileImage");
        String nickname = userInfo.get("nickname");

        log.info("nickname = {}", nickname);
        log.info("profileImage = {}", profileImage);
        log.info("email = {}", email);

        Map<String, Object> userMap = isJoined(email, nickname, profileImage,AuthProvider.KAKAO);

        return LoginRes.builder()
                .accessToken((String) userMap.get("accessToken"))
                .user((User) userMap.get("user"))
                .build();
    }

    private Map<String,Object> isJoined(String email, String name, String pictureUrl,AuthProvider authProvider) {
        Map<String, Object> map = new HashMap<>();
        User user;
        Optional<User> findUser = userRepository.findByEmail(email);

        String accessToken;
        String refreshToken;

        if(findUser.isPresent()) {
            user = findUser.get();
            accessToken = jwtTokenProvider.createAccessToken(email, user.getAuthorities());
            refreshToken = jwtTokenProvider.createRefreshToken();
            userRepository.updateRefreshToken(user.getId(), refreshToken);
        } else {
            user = createUser(email, name, pictureUrl,authProvider);
            accessToken = jwtTokenProvider.createAccessToken(email, user.getAuthorities());
            refreshToken = jwtTokenProvider.createRefreshToken();
            user.insertRefreshToken(refreshToken);
            userRepository.save(user);
        }

        map.put("user",user);
        map.put("accessToken", accessToken);

        return map;

    }

    private User createUser(String email, String name, String pictureUrl,AuthProvider authProvider) {
        UUID uuid = UUID.randomUUID();

        User user = User.builder()
                .authProvider(authProvider)
                .contactAgree(false)
                .contactAgreeDate(null)
                .description(null)
                .email(email)
                .image(pictureUrl)
                .joinDate(LocalDate.now(ZoneId.of("Asia/Seoul")))
                .name(name)
                .phone("010-0000-0000")
                .profileOpen(true)
                .roles(Collections.singletonList(UserRole.USER))
                .nickname(uuid.toString())
                .build();
        User saveUser = userRepository.save(user);
        List<QuestType> questTypes = questTypeRepository.findAll();
        questTypes.forEach((questType) -> expRepository.save(Exp.builder()
                .user(saveUser)
                .point(0)
                .questType(questType)
                .build()));

        return saveUser;
    }


    private Map<String, String> getUserInfo(String kakaoAccessToken) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> userInfo = new HashMap<>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";

        MultiValueMap<String,String> map = new LinkedMultiValueMap<>();
        MultiValueMap<String,String> headers = new LinkedMultiValueMap<>();

        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.add("Authorization", "Bearer " + kakaoAccessToken);

        map.add("secure_resource", "true");
        HttpEntity<MultiValueMap<String,String>> entity = new HttpEntity<>(map,headers);
        String result = restTemplate.postForObject(reqURL, entity, String.class);
        log.info("result={}", result);
        JsonElement jsonElement = JsonParser.parseString(result);
        JsonObject kakaoAcount = jsonElement.getAsJsonObject().get("kakao_account").getAsJsonObject();
        JsonObject profile = kakaoAcount.getAsJsonObject().get("profile").getAsJsonObject();
        String nickname = profile.getAsJsonObject().get("nickname").getAsString();
        String profileImage = profile.getAsJsonObject().get("profile_image_url").getAsString();
        String email = kakaoAcount.getAsJsonObject().get("email").getAsString();

        userInfo.put("nickname", nickname);
        userInfo.put("profileImage", profileImage);
        userInfo.put("email", email);

        return userInfo;
    }
}
