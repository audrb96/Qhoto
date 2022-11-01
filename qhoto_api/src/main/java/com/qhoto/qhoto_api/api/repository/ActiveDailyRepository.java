package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.Quest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiveDailyRepository extends JpaRepository<Quest, Long> {

}
