package com.qhoto.qhoto_api.domain;

import com.qhoto.qhoto_api.domain.type.QuestStatus;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ActiveDaily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "active_daily_id")
    private Long id;

    @Column(nullable = false)
    private LocalDate DailyQuestDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quest_id", nullable = false)
    private Quest quest;

    @Column(name = "daily_quest_status",nullable = false)
    @Enumerated(EnumType.STRING)
    private QuestStatus questStatus;



}
