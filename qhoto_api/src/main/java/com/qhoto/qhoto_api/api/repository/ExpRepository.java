package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.Exp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExpRepository extends JpaRepository<Exp, Long> {

    @Query("select e from Exp e where e.questType.code=:typeCode and e.user.id=:userId")
    Exp findAllByTypeCodeAndUserId(@Param("typeCode") String typeCode, @Param("userId") Long userId);

    @Query("select sum(e.point) from Exp e where e.user.id = :userId")
    int findPointByUserId(@Param("userId") Long userId);
}
