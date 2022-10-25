package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.Optional;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {

    @Query("select f from Feed f inner join fetch ActiveDaily a on f.quest.id=a.quest.id and f.user.id= :userId where a.status='A' order by f.time desc " )
    Optional<Feed> findWithPagingByUserIdAndStatus(@Param("userId") Long userId, Pageable pageable);

}
