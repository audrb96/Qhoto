package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.ActiveMonthly;
import com.qhoto.qhoto_api.domain.type.QuestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActiveMonthlyRepository extends JpaRepository<ActiveMonthly, Long> {

    ActiveMonthly findMonthlyById(Long activemonthlyId);

    @Modifying
    @Query(value = "update active_monthly set monthly_quest_status = 'A' where active_monthly_id > (select tmp.id from (select max(a.active_monthly_id) as id from active_monthly a where a.monthly_quest_status = 'A') tmp) limit 3", nativeQuery = true)
    int updateMonthlyQuestDtoA();

    @Modifying
    @Query(value = "update active_monthly set monthly_quest_status = 'D' where monthly_quest_status = 'A' limit 3", nativeQuery = true)
    int updateMonthlyQuestAtoD();
}
