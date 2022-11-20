package com.qhoto.qhoto_api.api.repository.feed;

import com.qhoto.qhoto_api.domain.FeedLike;
import com.qhoto.qhoto_api.domain.type.FeedLikePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeedLikeRepository extends JpaRepository<FeedLike, FeedLikePK> {

    @Query("select count(f) from FeedLike f where f.feed.id=:feedId")
    Optional<Integer> countAllById(@Param("feedId") Long feedId);

    @Query("select f from FeedLike f where f.user.id=:userId and f.feed.id=:feedId")
    Optional<FeedLike> findById(@Param("userId") Long userId, @Param("feedId") Long feedId);
}
