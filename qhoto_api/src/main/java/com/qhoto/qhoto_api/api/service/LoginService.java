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
import com.qhoto.qhoto_api.api.repository.exp.ExpRepository;
import com.qhoto.qhoto_api.api.repository.quest.QuestTypeRepository;
import com.qhoto.qhoto_api.api.repository.user.UserRepository;
import com.qhoto.qhoto_api.domain.AuthProvider;
import com.qhoto.qhoto_api.domain.Exp;
import com.qhoto.qhoto_api.domain.QuestType;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.domain.type.UserRole;
import com.qhoto.qhoto_api.dto.response.user.LoginRes;
import com.qhoto.qhoto_api.exception.InvalidIdTokenException;
import com.qhoto.qhoto_api.exception.NoUniqueUserException;
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
    private final String GOOGLE_CLIENT_ID = GoogleClientId;
    //구글 로그인
    public LoginRes loginGoogle(String idTokenString) throws GeneralSecurityException, IOException {
        HttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new JacksonFactory();
        // 구글 ID 토큰 validation
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport,jsonFactory)
                .setAudience(Collections.singletonList(GOOGLE_CLIENT_ID))
                .build();
        GoogleIdToken idToken = verifier.verify(idTokenString);

        if(idToken != null) {
            // validation 성공
            GoogleIdToken.Payload payload = idToken.getPayload();
            //payload를 가져온다.
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");

            //가입이 된 유저인지 판단하고 그에 맞는 정보를 가져온다.
            Map<String, Object> userMap = isJoined(email, name, pictureUrl,AuthProvider.GOOGLE);

            return LoginRes.builder()
                    .accessToken((String) userMap.get("accessToken"))
                    .refreshToken((String) userMap.get("refreshToken"))
                    .isJoined((Boolean) userMap.get("isJoined"))
                    .isModified((Boolean) userMap.get("isModified"))
                    .build();

        }
        else {
            // Google IdToken validation 실패
            throw new InvalidIdTokenException("Google TokenId is null.");
        }
    }
    //카카오 로그인
    public LoginRes loginKakao(String kakaoAccessToken) {
        // kakaoAccessToken 으로부터 사용자 정보를 가져온다.
        Map<String, String> userInfo = getUserInfo(kakaoAccessToken);

        String email = userInfo.get("email");
        String profileImage = userInfo.get("profileImage");
        String nickname = userInfo.get("nickname");

        log.info("nickname = {}", nickname);
        log.info("profileImage = {}", profileImage);
        log.info("email = {}", email);

        //가입이 된 유저인지 판단하고 그에 맞는 정보를 가져온다.
        Map<String, Object> userMap = isJoined(email, nickname, profileImage,AuthProvider.KAKAO);

        return LoginRes.builder()
                .accessToken((String) userMap.get("accessToken"))
                .refreshToken((String) userMap.get("refreshToken"))
                .isJoined((Boolean) userMap.get("isJoined"))
                .isModified((Boolean) userMap.get("isModified"))
                .build();
    }
    // 가입이 되어있는 지 판단 후 그에 맞는 데이터를 가져온다.
    private Map<String,Object> isJoined(String email, String name, String pictureUrl,AuthProvider authProvider) {
        Map<String, Object> map = new HashMap<>();
        User user;

        // 이메일로 사용자 가입 여부 판단.
        Optional<User> findUser = userRepository.findByEmailAndAuthProvider(email, authProvider);
        Long userCount = userRepository.countByEmailAndAuthProvider(email, authProvider);
        //JWT 토큰
        String accessToken;
        String refreshToken;

        if(userCount > 1L) throw new NoUniqueUserException("해당 하는 사용자가 여러개 있습니다.");

        //가입이 되어 있는 지 판단.
        boolean isJoined = false;
        //가입후 초기 정보 설정이 되어 있는지 판단.
        boolean isModified = false;

        if(findUser.isPresent() && userCount==1L) {
            //가입된 유저가 있을 때
            user = findUser.get();

            // Token 발급
            accessToken = jwtTokenProvider.createAccessToken(email, user.getAuthorities());
            refreshToken = jwtTokenProvider.createRefreshToken();

            // 사용자의 RefreshToken 업데이트
            userRepository.updateRefreshToken(user.getId(), refreshToken);

            // 이미 가입된 사용자
            isJoined = true;
            if(!user.getPhone().equals("010-0000-0000")) {
                //초기 정보 설정이 되어있는 사용자
                isModified = true;
            }
        } else {
            // 사용자 생성
            user = createUser(email, name, pictureUrl,authProvider);
            // JWT 토큰 발급
            accessToken = jwtTokenProvider.createAccessToken(email, user.getAuthorities());
            refreshToken = jwtTokenProvider.createRefreshToken();
            // refresh 토큰 저장
            user.insertRefreshToken(refreshToken);
            //유저 저장
            userRepository.save(user);
        }

        map.put("refreshToken",refreshToken);
        map.put("accessToken", accessToken);
        map.put("isJoined",isJoined);
        map.put("isModified", isModified);
        return map;

    }

    private User createUser(String email, String name, String pictureUrl,AuthProvider authProvider) {
        // 닉네임은 고유 값이므로 일단 uuid를 넣어 둔다.
        UUID uuid = UUID.randomUUID();
        //회원 생성
        User user = User.builder()
                .authProvider(authProvider)
                .contactAgree(true)
                .contactAgreeDate(LocalDate.now(ZoneId.of("Asia/Seoul")))
                .description(null)
                .email(email)
                .image(pictureUrl)
                .joinDate(LocalDate.now())
                .name(name)
                .phone("010-0000-0000")
                .expGrade("red")
                .totalExp(0)
                .profileOpen(true)
                .roles(Collections.singletonList(UserRole.USER))
                .nickname(uuid.toString())
                .build();

        //회원 저장
        User saveUser = userRepository.save(user);

        //퀘스트 타입을 불러온다.
        List<QuestType> questTypes = questTypeRepository.findAll();

        //각 퀘스트 타입에 포인트를 0으로 초기화
        questTypes.forEach((questType) -> expRepository.save(Exp.builder()
                .user(saveUser)
                .point(0)
                .questType(questType)
                .build()));

        return saveUser;
    }

    //카카오 access token 으로 유저 정보를 가져온다.
    private Map<String, String> getUserInfo(String kakaoAccessToken) {

        // kakao access token validation 검증을 위해 api 호출을 한다.
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> userInfo = new HashMap<>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";

        //request Body
        MultiValueMap<String,String> map = new LinkedMultiValueMap<>();

        //request Header
        MultiValueMap<String,String> headers = new LinkedMultiValueMap<>();

        //Header 추가
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.add("Authorization", "Bearer " + kakaoAccessToken);

        //Body 추가
        map.add("secure_resource", "true");
        HttpEntity<MultiValueMap<String,String>> entity = new HttpEntity<>(map,headers);

        // post 요청 결과를 받아온다.
        String result = restTemplate.postForObject(reqURL, entity, String.class);

        // 결과를 Json 파싱
        JsonElement jsonElement = JsonParser.parseString(result);
        JsonObject kakaoAcount = jsonElement.getAsJsonObject().get("kakao_account").getAsJsonObject();
        JsonObject profile = kakaoAcount.getAsJsonObject().get("profile").getAsJsonObject();

        // 회원 정보를 가져온다.
        String nickname = profile.getAsJsonObject().get("nickname").getAsString();
        String profileImage = profile.getAsJsonObject().get("profile_image_url").getAsString();
        String email = kakaoAcount.getAsJsonObject().get("email").getAsString();

        userInfo.put("nickname", nickname);
        userInfo.put("profileImage", profileImage);
        userInfo.put("email", email);

        return userInfo;
    }
}
