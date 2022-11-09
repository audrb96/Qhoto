package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.Quest;
import com.qhoto.qhoto_api.dto.response.ActiveQuestRes;
import com.qhoto.qhoto_api.dto.response.QuestOptionItemRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QuestRepository extends JpaRepository<Quest,Long> {

    Optional<Quest> findQuestById(Long QuestId);

    @Query("select new com.qhoto.qhoto_api.dto.response.ActiveQuestRes(a.id, q.id, q.difficulty, q.name, q.score, q.questType.code) from Quest q inner join fetch ActiveWeekly a on q.id = a.quest.id where a.status = 'A'")
    List<ActiveQuestRes> findAllWeeklyByIdAndStatus();

    @Query("select new com.qhoto.qhoto_api.dto.response.QuestOptionItemRes(q.id,a.id, q.name, q.questType.name) from Quest q inner join fetch ActiveWeekly a on q.id = a.quest.id where a.status = 'A'")
    List<QuestOptionItemRes> findAllWeeklyByQuestIdAndStatus();

    @Query("select new com.qhoto.qhoto_api.dto.response.ActiveQuestRes(a.id, q.id, q.difficulty, q.name, q.score, q.questType.code) from Quest q inner join fetch ActiveMonthly a on q.id = a.quest.id where a.status = 'A'")
    List<ActiveQuestRes> findAllMonthlyByIdAndStatus();

    @Query("select new com.qhoto.qhoto_api.dto.response.QuestOptionItemRes(q.id,a.id, q.name, q.questType.name) from Quest q inner join fetch ActiveMonthly a on q.id = a.quest.id where a.status = 'A'")
    List<QuestOptionItemRes> findAllMonthlyByQuestIdAndStatus();

    @Query("select new com.qhoto.qhoto_api.dto.response.ActiveQuestRes(a.id, q.id, q.difficulty, q.name, q.score, q.questType.code) from Quest q inner join fetch ActiveDaily a on q.id = a.quest.id where a.status = 'A'")
    List<ActiveQuestRes> findAllDailyByIdAndStatus();

    @Query("select new com.qhoto.qhoto_api.dto.response.QuestOptionItemRes(q.id,a.id, q.name, q.questType.name) from Quest q inner join fetch ActiveDaily a on q.id = a.quest.id where a.status = 'A'")
    List<QuestOptionItemRes> findAllDailyByQuestIdAndStatus();

}
