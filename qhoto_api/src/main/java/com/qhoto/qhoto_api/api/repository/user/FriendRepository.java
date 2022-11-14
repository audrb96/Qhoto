package com.qhoto.qhoto_api.api.repository.user;

import com.qhoto.qhoto_api.domain.Friend;
import com.qhoto.qhoto_api.domain.type.FriendPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FriendRepository extends JpaRepository<Friend, FriendPK> {

    @Modifying
    @Query("delete from Friend f where (f.follower.id=:userId and f.followee.id=:friendId) or (f.follower.id=:friendId and f.followee.id=:userId)")
    void deleteByUserIdAndFriendId(@Param("userId") Long id, @Param("friendId") Long friendId);
}
