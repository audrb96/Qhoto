package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.ActiveDaily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface ActiveDailyRepository extends JpaRepository<ActiveDaily, Long> {

    ActiveDaily findDailyById(Long activeDailyId);

    @Modifying
    @Query("update ActiveDaily a set a.status = 'A' where a.date = :today")
    int updateDailyQuestDtoA(@Param("today") LocalDate today);

    @Modifying
    @Query("update ActiveDaily a set a.status = 'D' where a.date = :yesterday" )
    int updateDailyQuestAtoD(@Param("yesterday") LocalDate yesterday);
}
