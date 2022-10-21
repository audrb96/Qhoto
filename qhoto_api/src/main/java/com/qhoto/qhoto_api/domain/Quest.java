package com.qhoto.qhoto_api.domain;

import com.qhoto.qhoto_api.domain.type.QuestDuration;
import com.qhoto.qhoto_api.domain.type.QuestStatus;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Quest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quest_id")
    private Long id;

    @Column(nullable = false)
    private String questName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestDuration questDuration;

    @Column(nullable = false)
    private Integer questScore;

    @Column(nullable = false)
    private Integer questDifficulty;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestStatus questStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_code", nullable = false)
    private QuestType questType;
}
