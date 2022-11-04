package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.FriendRequest;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.domain.type.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    Optional<FriendRequest> findByRequestUserAndResponseUserAndStatusNot(User reqUser, User ResUser, RequestStatus status);
    Optional<FriendRequest> findByRequestUserAndResponseUserAndStatus(User reqUser, User ResUser, RequestStatus status);
}
