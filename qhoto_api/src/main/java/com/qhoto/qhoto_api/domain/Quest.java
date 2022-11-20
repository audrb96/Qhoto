package com.qhoto.qhoto_api.domain;

import com.qhoto.qhoto_api.domain.type.QuestDuration;
import com.qhoto.qhoto_api.domain.type.QuestStatus;
import com.qhoto.qhoto_api.domain.type.converter.QuestDurationConverter;
import com.qhoto.qhoto_api.domain.type.converter.QuestStatusConverter;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.EnumType.*;
import static javax.persistence.FetchType.*;
import static javax.persistence.GenerationType.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Quest {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "quest_id")
    private Long id;

    @Column(name = "quest_name",nullable = false)
    private String name;

    @Convert(converter = QuestDurationConverter.class)
    @Column(name = "quest_duration",nullable = false)
    private QuestDuration duration;

    @Column(name = "quest_score",nullable = false)
    private Integer score;

    @Column(name = "quest_difficulty",nullable = false)
    private Integer difficulty;

    @Convert(converter = QuestStatusConverter.class)
    @Column(name = "quest_status",nullable = false)
    private QuestStatus status;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "type_code", nullable = false)
    private QuestType questType;
}
