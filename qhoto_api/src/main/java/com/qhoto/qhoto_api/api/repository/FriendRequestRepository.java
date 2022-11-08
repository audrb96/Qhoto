package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.FriendRequest;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.domain.type.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    @Query("select f.status from FriendRequest f where f.requestUser.id = :id and f.responseUser.id = :friendId")
    Optional<RequestStatus> findRequestStatusById(@Param("id") Long Id, @Param("friendId") Long friendId);

    Optional<FriendRequest> findByRequestUserAndResponseUserAndStatusNot(User reqUser, User ResUser, RequestStatus status);
    Optional<FriendRequest> findByRequestUserAndResponseUserAndStatus(User reqUser, User ResUser, RequestStatus status);

}
