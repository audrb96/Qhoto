package com.qhoto.qhoto_api.domain;

import com.qhoto.qhoto_api.domain.type.CommentStatus;
import lombok.*;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.*;
import static javax.persistence.GenerationType.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Comment {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "feed_id", nullable = false)
    private Feed feed;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "comment_context",nullable = false)
    private String context;

    @Column(name = "comment_time",nullable = false)
    private LocalDateTime time;

    @Column(name = "comment_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private CommentStatus status;
}
