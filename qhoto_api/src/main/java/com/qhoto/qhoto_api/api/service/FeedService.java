package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.CommentRepository;
import com.qhoto.qhoto_api.api.repository.FeedLikeRepository;
import com.qhoto.qhoto_api.api.repository.FeedRepository;
import com.qhoto.qhoto_api.api.repository.UserRepository;
import com.qhoto.qhoto_api.domain.Comment;
import com.qhoto.qhoto_api.domain.FeedLike;
import com.qhoto.qhoto_api.domain.type.CommentStatus;
import com.qhoto.qhoto_api.dto.request.CreateCommentReq;
import com.qhoto.qhoto_api.dto.request.LikeReq;
import com.qhoto.qhoto_api.dto.response.CommentRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedService {

    private final CommentRepository commentRepository;
    private final FeedRepository feedRepository;
    private final UserRepository userRepository;
    private final FeedLikeRepository feedLikeRepository;

    public void postComment(CreateCommentReq createCommentReq){

        Comment comment = Comment.builder()
                .feed(feedRepository.findFeedById(createCommentReq.getFeedId()))
                .user(userRepository.findUserById(createCommentReq.getUserId()))
                .context(createCommentReq.getCommentContext())
                .time(LocalDateTime.now())
                .status(CommentStatus.U)
                .build();
        commentRepository.save(comment);
    }

    public List<CommentRes> getComment(Long feedId){

        List<Comment> commentList = feedRepository.findCommentById(feedId);
        List<CommentRes> commentRes = new ArrayList<>();
        for (Comment comment : commentList) {
            commentRes.add(CommentRes.builder()
                            .userId(comment.getUser().getId())
                            .commentContext(comment.getContext())
                            .commentTime(comment.getTime())
                            .build());
        }
        return commentRes;
    }

    public void putComment(Long commentId){
        Comment comment = commentRepository.findCommentById(commentId);
        comment.changeCommentStatus(CommentStatus.D);
    }

    public void postLike(LikeReq likeReq){
        FeedLike feedLike = FeedLike.builder()
                .feed(feedRepository.findFeedById(likeReq.getFeedId()))
                .user(userRepository.findUserById(likeReq.getUserId()))
                .build();
        feedLikeRepository.save(feedLike);
    }

    public void deleteLike(LikeReq likeReq){
        FeedLike feedLike = FeedLike.builder()
                .feed(feedRepository.findFeedById(likeReq.getFeedId()))
                .user(userRepository.findUserById(likeReq.getUserId()))
                .build();

    }


}
