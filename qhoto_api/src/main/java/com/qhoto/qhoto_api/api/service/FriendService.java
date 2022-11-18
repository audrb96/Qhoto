package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.user.FriendRepository;
import com.qhoto.qhoto_api.api.repository.user.FriendRequestRepository;
import com.qhoto.qhoto_api.api.repository.user.UserRepository;
import com.qhoto.qhoto_api.domain.Friend;
import com.qhoto.qhoto_api.domain.FriendRequest;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.domain.type.RequestStatus;
import com.qhoto.qhoto_api.dto.request.FriendRequestReq;
import com.qhoto.qhoto_api.dto.response.user.FriendInfoRes;
import com.qhoto.qhoto_api.dto.response.user.FriendRes;
import com.qhoto.qhoto_api.dto.response.user.UserRes;
import com.qhoto.qhoto_api.exception.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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
    // 친구 요청 서비스
    @Transactional
    public void friendRequest(FriendRequestReq friendRequestReq, User reqUser) {
        // 요청을 받는 사용자
        Optional<User> resUser = userRepository.findUserById(friendRequestReq.getResUserId());

        // 이전에 요청을 보내는 사용자와 관련된 request가 있는지 확인
        Optional<FriendRequest> friendRequest = friendRequestRepository.findByRequestUserAndResponseUserAndStatusNot(reqUser,resUser.orElseThrow(() -> new NotFoundUserException("유저를 찾을 수 없습니다.")), DISCONNECTED);
        // 요청을 받는 사용자가 이전에 보내는 사용자에게 요청을 보냈었는지 확인
        Optional<FriendRequest> isAcceptRequest = friendRequestRepository.findByRequestUserAndResponseUserAndStatus(resUser.orElseThrow(() -> new NotFoundUserException("유저를 찾을 수 없습니다.")),reqUser, REQUEST);
        if (reqUser.getId()==resUser.get().getId()){
            throw new SelfRequestException("자기 자신에게 요청을 보낼 수 없습니다.");
        }
        // 이전에 있던 요청 정보를 확인
        if(friendRequest.isPresent()) {
            switch (friendRequest.get().getStatus()) {
                case REQUEST:
                    throw new AlreadyRequestException("이미 요청한 상대입니다.");
                case FRIEND:
                    throw new AlreadyFriendException("이미 친구인 상대입니다.");
                case GET:
                    // 요청을 보낸 사용자가 받은 요청이 있다면 친구를 만들어준다.
                    makeFriend(reqUser, resUser, isAcceptRequest.orElseThrow(() -> new NobodyRequestException("친구를 요청한 사람이 없는데 받은 사람만 있습니다.")),friendRequest.get());
                    break;
            }
        } else {
            // 새로운 요청 저장
            saveRequest(reqUser, resUser.get(), REQUEST);
            saveRequest(resUser.get(),reqUser,GET);
        }
    }
    //친구를 만들어 준다.
    private void makeFriend(User reqUser, Optional<User> resUser, FriendRequest isAcceptRequest, FriendRequest friendRequest) {
        //친구 요청의 상태를 이미 친구가 된것으로 변경
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

        //친구 테이블에 서로 친구가 된 것을 저장
        friendRepository.save(friend1);
        friendRepository.save(friend2);
    }
    //요청 저장 메소드
    private FriendRequest saveRequest(User reqUser, User resUser,RequestStatus status) {
        FriendRequest savedRequest = FriendRequest.builder()
                .requestUser(reqUser)
                .responseUser(resUser)
                .status(status)
                .time(LocalDateTime.now())
                .build();

        return friendRequestRepository.save(savedRequest);
    }

    // 친구 목록을 불러온다
    public List<FriendRes> getFriends(User user) {
        // 친구 리스트 가져오기
        List<User> friendList = userRepository.findFriendById(user.getId());
        List<FriendRes> friendResList = new ArrayList<>();
        // 친구 리스트 생성
        for(User friend:friendList){
            friendResList.add(FriendRes.builder()
                    .userId(friend.getId())
                    .nickname(friend.getNickname())
                    .userImage(friend.getImage())
                    .build());
        }
        return friendResList;
    }

    // 받은 친구 요청을 불러온다
    public List<FriendRes> getReceives(User user){
        // 친구 요청을 한 유저 리스트 가져오기
        List<User> receiveList = userRepository.findReceiveById(user.getId());
        List<FriendRes> friendResList = new ArrayList<>();
        // 친구 요청을 한 유저 리스트 생성
        for(User receive:receiveList){
            friendResList.add(FriendRes.builder()
                    .userId(receive.getId())
                    .nickname(receive.getNickname())
                    .userImage(receive.getImage())
                    .build());
        }
        return friendResList;
    }

    public FriendInfoRes getUserByNickName(User user, String nickName) {
        UserRes friend = userRepository.findUserByNickname(nickName);
        Optional.ofNullable(friend.getUserId()).orElseThrow(()-> new NoUserByNickNameException("유저를 찾을 수 없습니다."));
        FriendInfoRes friendInfo = FriendInfoRes.builder()
                .userId(friend.getUserId())
                .nickName(friend.getNickName())
                .email(friend.getEmail())
                .profileImg(friend.getProfileImg())
                .point(friend.getPoint())
                .build();
        RequestStatus status = friendRequestRepository.findRequestStatusById(user.getId(), friend.getUserId()).orElse(null);

        friendInfo.updateIsFriend(status);

        return friendInfo;
    }

    // 친구 끊기
   @Transactional
    public void putConnection(User user, Long friendId) {
        // 친구 요청 상태 불러오기
        List<FriendRequest> friendRequest = friendRequestRepository.findByUserIdAndFriendId(user.getId(),friendId);
        // 친구 삭제
        friendRepository.deleteByUserIdAndFriendId(user.getId(),friendId);
        // 친구 요청 상태 단절로 바꾸기
        friendRequest.stream().forEach((request) -> request.changeStatus(DISCONNECTED));
    }
}
