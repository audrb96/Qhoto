package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.FriendRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    @Query("select f from FriendRequest f inner join fetch User u on f.requestUser.id = :id where f.responseUser.id = :userId")
    FriendRequest findRequestStatusById(@Param("userId") Long userId,@Param("id") Long Id);

}
