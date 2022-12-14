package com.qhoto.qhoto_api.api.repository.feed;

import com.qhoto.qhoto_api.domain.Feed;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.domain.type.FeedStatus;
import com.qhoto.qhoto_api.dto.response.quest.QuestAggregateRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long>, FeedRepositoryCon {

    @Query("select f from Feed f inner join fetch ActiveDaily a on f.activeDaily.id = a.id where f.status = 'U' and a.status='A' and f.user.id= :userId")
    Optional<Feed> findClearDailyQuest(@Param("userId") Long userId);

    @Query("select f from Feed f inner join fetch ActiveWeekly a on f.activeWeekly.id = a.id where f.status = 'U' and a.status='A' and f.user.id= :userId")
    Optional<Feed> findClearWeeklyQuest(@Param("userId") Long userId);

    @Query("select f from Feed f inner join fetch ActiveMonthly a on f.activeMonthly.id = a.id where f.status = 'U' and a.status='A' and f.user.id= :userId")
    Optional<Feed> findClearMonthlyQuest(@Param("userId") Long userId);

    @Query("select count(f) from Feed f where f.typeCode = :typeCode and f.user.id = :userId")
    int findAllFeedByTypeCodeAndUserId(@Param("typeCode")String typeCode,@Param("userId") Long userId);

    @Query(value = "select ifnull(type_code, 'TOTAL') as code, ifnull(quest_duration, 'ALL') as duration, count(*) as count from feed where user_id= :userId group by type_code, quest_duration with rollup order by code", nativeQuery = true)
    List<QuestAggregateRes> findAllQuestWithRollUp(@Param("userId") Long userId);

    /**
     * feed를 찾는다.
     * @param feedId
     * @return {@link Optional<Feed>}
     */
    Optional<Feed> findFeedById(Long feedId);

    /**
     * 시간과 피드 상태에 맞는 피드를 가져온다.
     * @param start
     * @param end
     * @param status
     * @param user
     * @return {@link List<Feed>}
     */
    List<Feed> findByTimeBetweenAndStatusAndUser(LocalDateTime start, LocalDateTime end, FeedStatus status, User user);

    @Query("select f from Feed f where f.user.id=:userId order by f.time desc")
    List<Feed> findAllByUserId(@Param("userId") Long userId);

    @Modifying
    @Query("update Feed f set f.status='D' where f.id=:feedId")
    int deleteFeedByfeedId(@Param("feedId") Long feedId);
}
