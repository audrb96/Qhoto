package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.Quest;
import com.qhoto.qhoto_api.dto.response.QuestOptionItemRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestRepository extends JpaRepository<Quest,Long> {

    Quest findQuestById(Long QuestId);

    @Query("select q from Quest q inner join fetch ActiveWeekly a on q.id = a.quest.id where a.status = 'A'")
    List<Quest> findAllWeeklyByIdAndStatus();

    @Query("select new com.qhoto.qhoto_api.dto.response.QuestOptionItemRes(q.id,a.id, q.name, q.questType.name) from Quest q inner join fetch ActiveWeekly a on q.id = a.quest.id where a.status = 'A'")
    List<QuestOptionItemRes> findAllWeeklyByQuestIdAndStatus();

    @Query("select q from Quest q inner join fetch ActiveMonthly a on q.id = a.quest.id where a.status = 'A'")
    List<Quest> findAllMonthlyByIdAndStatus();

    @Query("select new com.qhoto.qhoto_api.dto.response.QuestOptionItemRes(q.id,a.id, q.name, q.questType.name) from Quest q inner join fetch ActiveMonthly a on q.id = a.quest.id where a.status = 'A'")
    List<QuestOptionItemRes> findAllMonthlyByQuestIdAndStatus();

    @Query("select q from Quest q inner join fetch ActiveDaily a on q.id = a.quest.id where a.status = 'A'")
    List<Quest> findAllDailyByIdAndStatus();

    @Query("select new com.qhoto.qhoto_api.dto.response.QuestOptionItemRes(q.id,a.id, q.name, q.questType.name) from Quest q inner join fetch ActiveDaily a on q.id = a.quest.id where a.status = 'A'")
    List<QuestOptionItemRes> findAllDailyByQuestIdAndStatus();

}
