package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.Comment;
import com.qhoto.qhoto_api.domain.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {

    Feed findFeedById(Long feedId);

    @Query("select c from Comment c inner join fetch Feed f on c.feed.id = f.id where f.id = :feedId")
    List<Comment> findCommentById(Long feedId);



}
