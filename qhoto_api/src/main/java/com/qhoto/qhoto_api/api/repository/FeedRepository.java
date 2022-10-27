package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {

    @Query("select f from Feed f inner join fetch ActiveDaily a "
            + "on f.quest.id=a.quest.id and f.user.id= :userId "
            + "and f.status = 'U'"
            + "and "
            + "where a.status='A'" )
    Optional<Feed> findClearDailyQuest(@Param("userId") Long userId);
    @Query(value = "select * from feed f inner join active_weekly a "
            +"on f.quest_id = a.quest_id and user_id = 1 "
            +"where f.feed_time between a.weekly_quest_date and date_add(a.weekly_quest_date, interval 7 day) "
            +"and a.weekly_quest_status='A'", nativeQuery = true)
    Optional<Feed> findClearWeeklyQuest(@Param("userId") Long userId);

    @Query("select f from Feed f inner join fetch ActiveDaily a "
            + "on f.quest.id=a.quest.id and f.user.id= :userId "
            + "and f.status = 'U' "
            + "and month(f.time) = month(a.date) "
            + "where a.status='A'" )
    Optional<Feed> findClearMonthlyQuest(@Param("userId") Long userId);


}
