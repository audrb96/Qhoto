package com.qhoto.qhoto_api.domain;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.*;
import static javax.persistence.GenerationType.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class Exp {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "exp_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;


    @Column(name = "exp_point", nullable = false)
    private Integer point;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "type_code", nullable = false)
    private QuestType questType;

}
