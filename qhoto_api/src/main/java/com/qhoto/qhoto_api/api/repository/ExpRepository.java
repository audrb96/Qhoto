package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.Exp;
import com.qhoto.qhoto_api.dto.response.QuestCountRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpRepository extends JpaRepository<Exp, Long> {
    @Query("select e from Exp e where e.questType.code=:typeCode and e.user.id=:userId")
    Exp findAllByTypeCodeAndUserId(@Param("typeCode") String typeCode, @Param("userId") Long userId);

    @Query("select new com.qhoto.qhoto_api.dto.response.QuestCountRes(e.questType.code, sum(e.point)) from Exp e where e.user.id=:userId group by e.questType.code order by e.questType.code")
    List<QuestCountRes> findPointByTypeCodeAndUserId(@Param("userId") Long userId);

    @Query("select sum(e.point) from Exp e where e.user.id = :userId")
    int findPointByUserId(@Param("userId") Long userId);
}
