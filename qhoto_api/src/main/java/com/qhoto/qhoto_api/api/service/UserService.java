package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.ExpRepository;
import com.qhoto.qhoto_api.api.repository.FeedRepository;
import com.qhoto.qhoto_api.api.repository.UserRepository;
import com.qhoto.qhoto_api.domain.Feed;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.ModifyUserReq;
import com.qhoto.qhoto_api.dto.response.MyFeedRes;
import com.qhoto.qhoto_api.dto.response.MyInfoRes;
import com.qhoto.qhoto_api.dto.response.UserInfoRes;
import com.qhoto.qhoto_api.exception.NoUserByIdException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final FeedRepository feedRepository;

    private final ExpRepository expRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
    }

    public void modifyUser(ModifyUserReq modifyUserReq, User userInfo) throws IOException {
        userRepository.modifyUserByCon(modifyUserReq, userInfo);
    }

    public MyInfoRes myInfo(User user) {
        return MyInfoRes.builder()
                .authProvider(user.getAuthProvider())
                .contactAgree(user.getContactAgree())
                .contactAgreeDate(user.getContactAgreeDate())
                .name(user.getName())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .JoinDate(user.getJoinDate())
                .phone(user.getPhone())
                .profileOpen(user.getProfileOpen())
                .UserImage(user.getImage())
                .description(user.getDescription())
                .build();
    }
    // 유저 정보 불러오기
    public UserInfoRes getUserInfo(Long userId) {
        // 유저 가져오기
        User user = userRepository.findUserById(userId).orElseThrow(()-> new NoUserByIdException("no user by Id"));
        // 유저 정보 생성하기
        UserInfoRes userInfoRes = UserInfoRes.builder()
                .email(user.getEmail())
                .userName(user.getUsername())
                .nickname(user.getNickname())
                .image(user.getImage())
                .profileOpen(user.getProfileOpen())
                .point(expRepository.findPointByUserId(user.getId()).orElseThrow(()-> new NoUserByIdException("no user by id")))
                .description(user.getDescription())
                .build();

        return userInfoRes;
    }

    // 나의 피드 불러오기
    public List<MyFeedRes> getMyFeed(User user){
        // 피드리스트 가져오기 
        List<Feed> feedList = feedRepository.findAllByUserId(user.getId());
        List<MyFeedRes> myFeedResList = new ArrayList<>();
        // 피드리스트 RES 생성하기
        for(Feed feed:feedList){
            myFeedResList.add(MyFeedRes.builder()
                            .feedId(feed.getId())
                            .feedImage(feed.getImage())
                            .feedTime(feed.getTime().format(DateTimeFormatter.ofPattern("yyyy-MM-DD HH:MM")))
                            .questName(feed.getQuestName())
                            .typeCode(feed.getTypeCode())
                            .build());
        }
        return myFeedResList;
    }

    // 닉네임 중복 확인하기
    public Boolean confirmUser(String nickname) {
        return userRepository.existsByNickname(nickname);
    }


}
