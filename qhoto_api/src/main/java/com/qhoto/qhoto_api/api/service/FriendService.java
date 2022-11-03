package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.FriendRepository;
import com.qhoto.qhoto_api.api.repository.FriendRequestRepository;
import com.qhoto.qhoto_api.api.repository.UserRepository;
import com.qhoto.qhoto_api.domain.FriendRequest;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.domain.type.RequestStatus;
import com.qhoto.qhoto_api.dto.request.FriendRequestReq;
import com.qhoto.qhoto_api.exception.NotFoundUserException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRequestRepository friendRequestRepository;
    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    public void friendRequest(FriendRequestReq friendRequestReq, User user) {
        Optional<User> resUser = userRepository.findUserById(friendRequestReq.getResUserId());

        friendRequestRepository.findByRequestUser(user);
        


        FriendRequest.builder()
                .requestUser(user)
                .responseUser(resUser.orElseThrow(() -> new NotFoundUserException("유저를 찾을 수 없습니다.")))
                .status(RequestStatus.R)
                .time(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .build();

    }
}
