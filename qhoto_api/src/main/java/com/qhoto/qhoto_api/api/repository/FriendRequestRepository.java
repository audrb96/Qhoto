package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.FriendRequest;
import com.qhoto.qhoto_api.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    Optional<FriendRequest> findByRequestUser(User user);
}
