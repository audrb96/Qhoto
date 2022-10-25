package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.Quest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActiveWeeklyRepository {

    @Query("select q from Quest q inner join fetch ActiveWeekly a on q.id = a.quest.id where a.status = 'A'")
    List<Quest> findAllByIdAndStatus();

}
