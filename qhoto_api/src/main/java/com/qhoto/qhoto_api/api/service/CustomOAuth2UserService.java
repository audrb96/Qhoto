package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.ExpRepository;
import com.qhoto.qhoto_api.api.repository.QuestTypeRepository;
import com.qhoto.qhoto_api.api.repository.UserRepository;
import com.qhoto.qhoto_api.domain.AuthProvider;
import com.qhoto.qhoto_api.domain.Exp;
import com.qhoto.qhoto_api.domain.QuestType;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.domain.type.UserRole;
import com.qhoto.qhoto_api.dto.layer.CustomUserDetails;
import com.qhoto.qhoto_api.dto.layer.OAuth2UserInfo;
import com.qhoto.qhoto_api.dto.layer.OAuth2UserInfoFactory;
import com.qhoto.qhoto_api.exception.OAuthProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final QuestTypeRepository questTypeRepository;
    private final ExpRepository expRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        return process(oAuth2UserRequest, oAuth2User);
    }

    private OAuth2User process(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        AuthProvider authProvider = AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(authProvider, oAuth2User.getAttributes());

        if(userInfo.getEmail().isEmpty()) {
            throw new OAuthProcessingException("Email not found from OAuth2 provider");
        }
        Optional<User> userOptional = userRepository.findByEmail(userInfo.getEmail());
        User user;

        if(userOptional.isPresent()) {
            user = userOptional.get();
            if(authProvider != user.getAuthProvider()) {
                throw new OAuthProcessingException("Wrong Match Auth Provider");
            }
        } else {
            user = createUser(userInfo, authProvider);
        }

        return CustomUserDetails.create(user,oAuth2User.getAttributes());

    }

    private User createUser(OAuth2UserInfo userInfo, AuthProvider authProvider) {
        User user = User.builder()
                .email(userInfo.getEmail())
                .userRole(UserRole.USER)
                .authProvider(authProvider)
                .contactAgree(false)
                .contactAgreeDate(null)
                .image(userInfo.getImageUrl())
                .joinDate(LocalDate.now(ZoneId.of("Asia/Seoul")))
                .nickname("tempUser")
                .phone("010-0000-0000")
                .profileOpen(true)
                .name(userInfo.getName())
                .build();

        List<QuestType> questTypes = questTypeRepository.findAll();
        questTypes.forEach((questType) -> expRepository.save(Exp.builder()
                .user(user)
                .point(0)
                .questType(questType)
                .build()));

        return userRepository.save(user);
    }
}
