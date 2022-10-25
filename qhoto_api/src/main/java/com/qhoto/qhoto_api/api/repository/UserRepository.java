package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserById(Long UserId);
}
