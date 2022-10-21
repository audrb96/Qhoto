package com.qhoto.qhoto_api.domain;

import com.qhoto.qhoto_api.domain.type.QuestDuration;
import com.qhoto.qhoto_api.domain.type.feedStatus;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Feed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quest_id", nullable = false)
    private Quest quest;

    @Column(name = "feed_image", nullable = false)
    private String image;

    @Column(nullable = false)
    private LocalDateTime FeedTime;

    @Enumerated(EnumType.STRING)
    private feedStatus feedStatus;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String typeCode;

    @Column(nullable = false)
    private Integer questScore;

    @Column(nullable = false)
    private Integer questDifficulty;

    @Column(nullable = false)
    private QuestDuration questDuration;
}
