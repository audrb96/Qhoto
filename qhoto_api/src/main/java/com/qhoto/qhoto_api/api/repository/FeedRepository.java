package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.Feed;
import com.qhoto.qhoto_api.dto.response.QuestCountRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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

    @Query("select new com.qhoto.qhoto_api.dto.response.QuestCountRes(coalesce(f.typeCode, 'TOTAL'), coalesce(f.duration, 'ALL'), count(f)) from Feed f group by  f.typeCode, f.duration ")
    @Query(value = "select ifnull(type_code, 'TOTAL') as type_code, ifnull(quest_duration, 'ALL') as quest_duration, count(*) from feed  group by type_code, quest_duration with rollup", nativeQuery = true)

    List<QuestCountRes> findAllQuestWithRollUp();

    Feed findFeedById(Long feedId);

}
