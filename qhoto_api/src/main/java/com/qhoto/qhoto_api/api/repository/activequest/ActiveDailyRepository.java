package com.qhoto.qhoto_api.api.repository.activequest;

import com.qhoto.qhoto_api.domain.ActiveDaily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface ActiveDailyRepository extends JpaRepository<ActiveDaily, Long> {

    /**
     * 일간퀘스트를 찾는다.
     * @param activeDailyId
     * @return {@link ActiveDaily}
     */
    ActiveDaily findDailyById(Long activeDailyId);

    /**
     * 활성 일간 퀘스트를 disable 에서 active 로 변경
     * @param today
     * @return {@link int}
     */
    @Modifying
    @Query("update ActiveDaily a set a.status = 'A' where a.date = :today")
    int updateDailyQuestDtoA(@Param("today") LocalDate today);
    /**
     * 활성 일간 퀘스트를 active 에서 disable 로 변경
     * @param yesterday
     * @return {@link int}
     */
    @Modifying
    @Query("update ActiveDaily a set a.status = 'D' where a.date = :yesterday" )
    int updateDailyQuestAtoD(@Param("yesterday") LocalDate yesterday);
}
