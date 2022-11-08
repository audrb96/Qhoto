package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.FriendRepository;
import com.qhoto.qhoto_api.api.repository.FriendRequestRepository;
import com.qhoto.qhoto_api.api.repository.UserRepository;
import com.qhoto.qhoto_api.domain.Friend;
import com.qhoto.qhoto_api.domain.FriendRequest;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.domain.type.RequestStatus;
import com.qhoto.qhoto_api.dto.request.FriendRequestReq;
import com.qhoto.qhoto_api.dto.response.FriendRes;
import com.qhoto.qhoto_api.exception.AlreadyFriendException;
import com.qhoto.qhoto_api.exception.AlreadyRequestException;
import com.qhoto.qhoto_api.exception.NobodyRequestException;
import com.qhoto.qhoto_api.exception.NotFoundUserException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.qhoto.qhoto_api.domain.type.RequestStatus.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRequestRepository friendRequestRepository;
    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    @Transactional
    public void friendRequest(FriendRequestReq friendRequestReq, User reqUser) {
        Optional<User> resUser = userRepository.findUserById(friendRequestReq.getResUserId());

        Optional<FriendRequest> friendRequest = friendRequestRepository.findByRequestUserAndResponseUserAndStatusNot(reqUser,resUser.orElseThrow(() -> new NotFoundUserException("유저를 찾을 수 없습니다.")), DISCONNECTED);
        Optional<FriendRequest> isAcceptRequest = friendRequestRepository.findByRequestUserAndResponseUserAndStatus(resUser.orElseThrow(() -> new NotFoundUserException("유저를 찾을 수 없습니다.")),reqUser, REQUEST);


        if(friendRequest.isPresent()) {
            switch (friendRequest.get().getStatus()) {
                case REQUEST:
                    throw new AlreadyRequestException("이미 요청한 상대입니다.");
                case FRIEND:
                    throw new AlreadyFriendException("이미 친구인 상대입니다.");
                case GET:
                    makeFriend(reqUser, resUser, isAcceptRequest.orElseThrow(() -> new NobodyRequestException("친구를 요청한 사람이 없는데 받은 사람만 있습니다.")),friendRequest.get());
                    break;
            }
        } else {
            saveRequest(reqUser, resUser.get(), REQUEST);
            saveRequest(resUser.get(),reqUser,GET);
        }
    }

    private void makeFriend(User reqUser, Optional<User> resUser, FriendRequest isAcceptRequest, FriendRequest friendRequest) {
        isAcceptRequest.changeStatus(FRIEND);
        friendRequest.changeStatus(FRIEND);
        Friend friend1 = Friend.builder()
                .follower(reqUser)
                .followee(resUser.get())
                .build();

        Friend friend2 = Friend.builder()
                .follower(resUser.get())
                .followee(reqUser)
                .build();

        friendRepository.save(friend1);
        friendRepository.save(friend2);
    }

    private FriendRequest saveRequest(User reqUser, User resUser,RequestStatus status) {
        FriendRequest savedRequest = FriendRequest.builder()
                .requestUser(reqUser)
                .responseUser(resUser)
                .status(status)
                .time(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .build();

        return friendRequestRepository.save(savedRequest);
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
