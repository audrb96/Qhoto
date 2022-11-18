package com.qhoto.qhoto_api.api.repository.activequest;

import com.qhoto.qhoto_api.domain.ActiveMonthly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface ActiveMonthlyRepository extends JpaRepository<ActiveMonthly, Long> {
    /**
     * 활성 월간 퀘스트를 찾는다.
     * @param activemonthlyId
     * @return {@link ActiveMonthly}
     */
    ActiveMonthly findMonthlyById(Long activemonthlyId);

    /**
     * 활성 월간 퀘스트를 disable 에서 active 로 변경
     * @param today
     * @return
     */
    @Modifying
    @Query("update ActiveMonthly a set a.status = 'A' where a.date = :today")
    int updateMonthlyQuestDtoA(@Param("today") LocalDate today);

    /**
     * 활성 월간 퀘스트를 disable 에서 active 로 변경
     * @param lastMonth
     * @return {@link int}
     */
    @Modifying
    @Query("update ActiveMonthly a set a.status = 'D' where a.date = :lastMonth")
    int updateMonthlyQuestAtoD(@Param("lastMonth") LocalDate lastMonth);
}
