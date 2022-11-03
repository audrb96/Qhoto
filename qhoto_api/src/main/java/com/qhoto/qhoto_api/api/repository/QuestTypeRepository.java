package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.QuestType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestTypeRepository extends JpaRepository<QuestType, String> {
    List<QuestType> findAll();
}
