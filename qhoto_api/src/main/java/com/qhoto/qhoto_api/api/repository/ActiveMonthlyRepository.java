package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.ActiveMonthly;
import com.qhoto.qhoto_api.domain.Quest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiveMonthlyRepository extends JpaRepository<Quest, Long> {

    ActiveMonthly findMonthlyById(Long activemonthlyId);

}
