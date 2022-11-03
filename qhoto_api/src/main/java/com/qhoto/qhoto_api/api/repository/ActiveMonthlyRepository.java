package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.ActiveMonthly;
import com.qhoto.qhoto_api.domain.Quest;
import com.qhoto.qhoto_api.dto.response.QuestOptionRes;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActiveMonthlyRepository extends JpaRepository<ActiveMonthly, Long> {

    ActiveMonthly findMonthlyById(Long activemonthlyId);
    @Query("select q from Quest q inner join fetch ActiveMonthly a on q.id = a.quest.id where a.status = 'A'")
    List<Quest> findAllByIdAndStatus();

    @Query("select new com.qhoto.qhoto_api.dto.response.QuestOptionRes(a.id, q.name, q.questType.name) from Quest q inner join fetch ActiveMonthly a on q.id = a.quest.id where a.status = 'A'")
    List<QuestOptionRes> findAllByQuestIdAndStatus();

//    @Modifying
//    @Query("update ActiveMonthly a set a.status = 'A' where a.status = 'D' ")
//    int disalbleMonthlyQuest();

//    @Query("select a from ActiveMonthly a where a.status = 'D' order by a.date")
//    List<ActiveMonthly> findNextActiveMonthly(Pageable pageable);

    List<ActiveMonthly> findByStatusOrderByDateDesc(String status, Pageable pageable);
}
