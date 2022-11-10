package com.qhoto.qhoto_api.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class ExpGrade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exp_grade_id")
    private Long id;

    @Column(nullable = false)
    private String gradeName;

    @Column(nullable = false)
    private Integer boundaryPoint;
}
