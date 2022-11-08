package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.ActiveDaily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiveDailyRepository extends JpaRepository<ActiveDaily, Long> {

    ActiveDaily findDailyById(Long activeDailyId);

    @Modifying
    @Query(value = "update active_daily set daily_quest_status = 'A' where active_daily_id > (select tmp.id from (select max(a.active_daily_id) as id from active_daily a where a.daily_quest_status = 'A') tmp) limit 3", nativeQuery = true)
    int updateDailyQuestDtoA();

    @Modifying
    @Query(value = "update active_daily set daily_quest_status = 'D' where daily_quest_status = 'A' limit 3", nativeQuery = true)
    int updateDailyQuestAtoD();
}
