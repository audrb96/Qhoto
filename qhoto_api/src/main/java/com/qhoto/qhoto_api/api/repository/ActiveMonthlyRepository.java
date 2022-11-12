package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.ActiveMonthly;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface ActiveMonthlyRepository extends JpaRepository<ActiveMonthly, Long> {

    ActiveMonthly findMonthlyById(Long activemonthlyId);

    @Modifying
    @Query("update ActiveMonthly a set a.status = 'A' where a.date = :today")
    int updateMonthlyQuestDtoA(@Param("today") LocalDate today);

    @Modifying
    @Query("update ActiveMonthly a set a.status = 'D' where a.date = :lastMonth")
    int updateMonthlyQuestAtoD(@Param("lastMonth") LocalDate lastMonth);
}
