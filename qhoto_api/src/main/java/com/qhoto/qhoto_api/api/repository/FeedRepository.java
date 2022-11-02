package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long>, FeedRepositoryCon {

    @Query("select f from Feed f inner join fetch ActiveDaily a on f.activeDaily.id = a.id where f.status = 'U' and a.status='A' and f.user.id= :userId")
    Optional<Feed> findClearDailyQuest(@Param("userId") Long userId);
    @Query("select f from Feed f inner join fetch ActiveWeekly a on f.activeWeekly.id = a.id where f.status = 'U' and a.status='A' and f.user.id= :userId")
    Optional<Feed> findClearWeeklyQuest(@Param("userId") Long userId);
    @Query("select f from Feed f inner join fetch ActiveMonthly a on f.activeMonthly.id = a.id where f.status = 'U' and a.status='A' and f.user.id= :userId")
    Optional<Feed> findClearMonthlyQuest(@Param("userId") Long userId);
    Optional<Feed> findFeedById(Long feedId);

}
