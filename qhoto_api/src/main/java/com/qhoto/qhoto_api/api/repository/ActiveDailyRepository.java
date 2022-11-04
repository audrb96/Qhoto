package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.ActiveDaily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiveDailyRepository extends JpaRepository<ActiveDaily, Long> {

    ActiveDaily findDailyById(Long activeDailyId);

}
