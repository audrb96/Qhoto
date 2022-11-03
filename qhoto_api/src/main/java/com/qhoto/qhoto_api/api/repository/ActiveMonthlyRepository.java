package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.ActiveMonthly;
import com.qhoto.qhoto_api.domain.Quest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiveMonthlyRepository extends JpaRepository<Quest, Long> {

    ActiveMonthly findMonthlyById(Long activemonthlyId);
    @Query("select q from Quest q inner join fetch ActiveMonthly a on q.id = a.quest.id where a.status = 'A'")
    List<Quest> findAllByIdAndStatus();

    @Query("select new com.qhoto.qhoto_api.dto.response.QuestOptionRes(a.id, q.name, q.questType.name) from Quest q inner join fetch ActiveMonthly a on q.id = a.quest.id where a.status = 'A'")
    List<QuestOptionRes> findAllByQuestIdAndStatus();

}
