package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {

    Feed findFeedById(Long feedId);




}
