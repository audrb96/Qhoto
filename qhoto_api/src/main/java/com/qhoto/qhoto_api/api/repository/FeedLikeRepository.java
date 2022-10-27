package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.FeedLike;
import com.qhoto.qhoto_api.domain.type.FeedLikePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedLikeRepository extends JpaRepository<FeedLike, FeedLikePK> {

}
