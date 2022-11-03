package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.ActiveWeekly;
import com.qhoto.qhoto_api.domain.Quest;
import com.qhoto.qhoto_api.dto.response.QuestOptionItemRes;
import com.qhoto.qhoto_api.dto.response.QuestOptionRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ActiveWeeklyRepository extends JpaRepository<ActiveWeekly, Long> {

    ActiveWeekly findWeeklyById(Long activeWeeklyId);
    @Query("select q from Quest q inner join fetch ActiveWeekly a on q.id = a.quest.id where a.status = 'A'")
    List<Quest> findAllByIdAndStatus();

}
