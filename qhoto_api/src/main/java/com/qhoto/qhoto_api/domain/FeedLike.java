package com.qhoto.qhoto_api.domain;

import com.qhoto.qhoto_api.domain.type.FeedLikePK;
import lombok.*;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@IdClass(FeedLikePK.class)
public class FeedLike implements Persistable<FeedLikePK> {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @Override
    public FeedLikePK getId() {
        return new FeedLikePK(this.feed, this.user);
    }

    @Override
    public boolean isNew() {
        return false;
    }
}
