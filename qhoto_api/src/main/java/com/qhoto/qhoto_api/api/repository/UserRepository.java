package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.response.UserRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>,UserRepositoryByCon {
    Optional<User> findByEmail(String email);
    Optional<User> findUserById(Long userId);
    boolean existsByEmail(String email);
    @Query("select u.refreshToken from User u where u.id = :id")
    String getRefreshTokenById(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query("update User u set u.refreshToken=:token where u.id=:id")
    void updateRefreshToken(@Param("id") Long id, @Param("token") String token);

    Optional<UserRes> findUserByNickname(String nickName);


}
