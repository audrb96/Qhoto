package com.qhoto.qhoto_api.api.repository.user;

import com.qhoto.qhoto_api.domain.FriendRequest;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.domain.type.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    @Query("select f.status from FriendRequest f where f.requestUser.id = :id and f.responseUser.id = :friendId")
    Optional<RequestStatus> findRequestStatusById(@Param("id") Long Id, @Param("friendId") Long friendId);

    /**
     * 친구 요청유저, 받은 유저를 받고 요청 상태와 다른 친구요청정보를 가져온다.
     * @param reqUser
     * @param ResUser
     * @param status
     * @return {@link Optional<FriendRequest>}
     */
    Optional<FriendRequest> findByRequestUserAndResponseUser(User reqUser, User ResUser);

    /**
     * 친구 요청유저, 받은 유저, 요청 상태에 맞는 FriendRequest를 가져온다.
     * @param reqUser
     * @param ResUser
     * @param status
     * @return {@link Optional<FriendRequest>}
     */
    Optional<FriendRequest> findByRequestUserAndResponseUserAndStatus(User reqUser, User ResUser, RequestStatus status);

    @Query("select f from FriendRequest f where (f.requestUser.id=:userId and f.responseUser.id=:friendId) or (f.requestUser.id=:friendId and f.responseUser.id=:userId)")
    List<FriendRequest> findByUserIdAndFriendId(@Param("userId") Long id, @Param("friendId") Long friendId);

    @Modifying
    @Query("update FriendRequest f set f.status=:status where f.requestUser=:reqUser and f.responseUser =:resUser")
    int updateStatus(@Param("status") RequestStatus status, @Param("reqUser") User reqUser, @Param("resUser") User resUser);
}
