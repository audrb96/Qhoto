package com.qhoto.qhoto_api.api.repository.activequest;

import com.qhoto.qhoto_api.domain.ActiveWeekly;
import com.qhoto.qhoto_api.domain.type.QuestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ActiveWeeklyRepository extends JpaRepository<ActiveWeekly, Long> {
    /**
     * 활성 주간 퀘스트를 찾는다.
      * @param activeWeeklyId
     * @return {@link ActiveWeekly}
     */
    ActiveWeekly findWeeklyById(Long activeWeeklyId);

    /**
     * 활정 주간 퀘스트를 disable 에서 active 로 변경
     * @param today
     * @return {@link int}
     */
    @Modifying
    @Query("update ActiveWeekly a set a.status = 'A' where a.date = :today ")
    int updateWeeklyQuestDtoA(@Param("today") LocalDate today);

    /**
     * 활성 주간 퀘스트를 active 에서 disable 로 변경
     * @param lastWeek
     * @return
     */
    @Modifying
    @Query("update ActiveWeekly a set a.status = 'D' where a.date = :lastWeek")
    int updateWeeklyQuestAtoD(@Param("lastWeek") LocalDate lastWeek);

}
