package com.qhoto.qhoto_api.domain;

import com.qhoto.qhoto_api.domain.type.QuestDuration;
import com.qhoto.qhoto_api.domain.type.feedStatus;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.*;
import static javax.persistence.GenerationType.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Feed {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "feed_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "quest_id", nullable = false)
    private Quest quest;

    @Column(name = "feed_image", nullable = false)
    private String image;

    @Column(name = "feed_time",nullable = false)
    private LocalDateTime time;

    @Enumerated(EnumType.STRING)
    @Column(name = "feed_status", nullable = false)
    private feedStatus status;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String typeCode;

    @Column(name = "quest_score",nullable = false)
    private Integer score;

    @Column(name = "quest_dfficulty",nullable = false)
    private Integer difficulty;

    @Column(name = "quest_duration",nullable = false)
    private QuestDuration duration;
}
