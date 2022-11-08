package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.ActiveWeekly;
import com.qhoto.qhoto_api.domain.Quest;
import com.qhoto.qhoto_api.domain.type.QuestStatus;
import com.qhoto.qhoto_api.dto.response.QuestOptionItemRes;
import com.qhoto.qhoto_api.dto.response.QuestOptionRes;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ActiveWeeklyRepository extends JpaRepository<ActiveWeekly, Long> {

    ActiveWeekly findWeeklyById(Long activeWeeklyId);

    List<ActiveWeekly> findTop3ByStatusOrderByDateDesc(QuestStatus questStatus);

    @Modifying
    @Query(value = "update active_weekly set weekly_quest_status = 'A' where active_weekly_id > (select tmp.id from (select max(a.active_weekly_id) as id from active_weekly a where a.weekly_quest_status = 'A') tmp) limit 3", nativeQuery = true)
    int updateMonthlyQuestDtoA();

    @Modifying
    @Query(value = "update active_weekly set weekly_quest_status = 'D' where weekly_quest_status = 'A' limit 3", nativeQuery = true)
    int updateMonthlyQuestAtoD();

}
