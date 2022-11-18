package com.qhoto.qhoto_api.api.repository.feed;

import com.qhoto.qhoto_api.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    Comment findCommentById(Long commentId);

    @Query("select c from Comment c inner join fetch Feed f on c.feed.id = f.id where f.id = :feedId and c.status='U'")
    List<Comment> findListById(@Param("feedId") Long feedId);


}
