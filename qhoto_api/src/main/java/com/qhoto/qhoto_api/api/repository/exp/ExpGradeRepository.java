package com.qhoto.qhoto_api.api.repository.exp;

import com.qhoto.qhoto_api.domain.ExpGrade;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpGradeRepository extends JpaRepository<ExpGrade, Long> {

    /**
     * 경험치로 경험치등급을 확인한다.
     * @param point
     * @param pageable
     * @return {@link List<ExpGrade>}
     */
    @Query("select e from ExpGrade e where e.boundaryPoint<=:point")
    List<ExpGrade> findByBoundaryPoint(@Param("point") int point, Pageable pageable);

}
