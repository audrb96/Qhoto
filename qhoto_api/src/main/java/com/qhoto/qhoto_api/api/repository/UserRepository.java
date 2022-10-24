package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findUserById(Long UserId);

}
