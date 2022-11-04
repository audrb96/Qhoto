package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.FeedRepository;
import com.qhoto.qhoto_api.api.repository.UserRepository;
import com.qhoto.qhoto_api.domain.Feed;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.ModifyUserReq;
import com.qhoto.qhoto_api.dto.response.FriendRes;
import com.qhoto.qhoto_api.dto.response.MyFeedRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final FeedRepository feedRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
    }

    public void modifyUser(ModifyUserReq modifyUserReq, User userInfo) throws IOException {
        userRepository.modifyUserByCon(modifyUserReq, userInfo);
    }

    public List<MyFeedRes> getMyFeed(){
        Long userId = 2L;
        List<Feed> feedList = feedRepository.findAllByUserId(userId);
        List<MyFeedRes> myFeedResList = new ArrayList<>();
        for(Feed feed:feedList){
            myFeedResList.add(MyFeedRes.builder()
                            .feedId(feed.getId())
                            .feedImage(feed.getImage())
                            .feedTime(feed.getTime())
                            .questName(feed.getQuestName())
                            .typeCode(feed.getTypeCode())
                            .build());
        }
        return myFeedResList;

    }


    public Boolean confirmUser(String nickname) {
        return userRepository.existsByNickname(nickname);
    }


    public List<FriendRes> getFriends(User user) {
        List<User> friendList = userRepository.findFriendById(user.getId());
        List<FriendRes> friendResList = new ArrayList<>();
        for(User friend:friendList){
            friendResList.add(FriendRes.builder()
                            .userId(friend.getId())
                            .nickname(friend.getNickname())
                            .userImage(friend.getImage())
                    .build());
        }
        return friendResList;
    }

    public List<FriendRes> getReceives(User user){
        List<User> receiveList = userRepository.findReceiveById(user.getId());
        List<FriendRes> friendResList = new ArrayList<>();
        for(User receive:receiveList){
            friendResList.add(FriendRes.builder()
                            .userId(receive.getId())
                            .nickname(receive.getNickname())
                            .userImage(receive.getImage())
                    .build());
        }
        return friendResList;
    }

}
