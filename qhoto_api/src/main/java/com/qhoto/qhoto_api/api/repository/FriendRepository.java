package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.Friend;
import com.qhoto.qhoto_api.domain.type.FriendPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, FriendPK> {

}
