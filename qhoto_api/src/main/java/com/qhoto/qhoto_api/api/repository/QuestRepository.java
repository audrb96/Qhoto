package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.Quest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestRepository extends JpaRepository<Quest,Long> {

    Quest findQuestById(Long QuestId);

}
