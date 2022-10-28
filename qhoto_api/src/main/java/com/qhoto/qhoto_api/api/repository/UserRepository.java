package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    User findUserById(Long userId);
    boolean existsByEmail(String email);

    @Query("select u.refreshToken from User u where u.id = :id")
    String getRefreshTokenById(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query("update User u set u.refreshToken=:token where u.id=:id")
    void updateRefreshToken(@Param("id") Long id, @Param("token") String token);

}
