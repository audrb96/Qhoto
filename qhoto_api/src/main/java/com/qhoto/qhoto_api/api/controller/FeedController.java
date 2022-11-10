package com.qhoto.qhoto_api.api.controller;


import com.qhoto.qhoto_api.api.service.FeedService;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.CreateCommentReq;
import com.qhoto.qhoto_api.dto.request.CreateFeedReq;
import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.request.LikeReq;
import com.qhoto.qhoto_api.dto.response.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

/**
 * 피드 api
 */
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/feed")
public class FeedController {

    private final FeedService feedService;

    /**
     * 전체 피드를 조회하는 api
     * @param feedAllReq
     * @param pageable
     * @return {@link Page<FeedAllDto>}
     */
    @GetMapping("/all")
    public ResponseEntity<Page<FeedAllDto>> readFeed(@AuthenticationPrincipal User user, @ModelAttribute FeedAllReq feedAllReq, Pageable pageable){
        return new ResponseEntity<>(feedService.getFeed(user,feedAllReq, pageable),HttpStatus.OK);
    }

    /**
     * 피드 Detail api
     * @param feedId
     * @return {@link FeedDetailRes}
     */
    @GetMapping("/all/{feedId}")
    public ResponseEntity<FeedDetailRes> readFeedDetail(@AuthenticationPrincipal User user, @PathVariable Long feedId){
        return new ResponseEntity<>(feedService.getFeedDetail(feedId, user), HttpStatus.OK);
    }

    /**
     * 친구 피드 api
     * @param user
     * @param feedAllReq
     * @param pageable
     * @return {@link Page<FeedFriendDto>}
     */
    @GetMapping("/friend")
    public ResponseEntity<Page<FeedFriendDto>> readFriendFeed(@AuthenticationPrincipal User user, @ModelAttribute FeedAllReq feedAllReq, Pageable pageable){
        log.info("FeedAllReq = {}" , feedAllReq);
        return new ResponseEntity<>(feedService.getFriendFeed(user, feedAllReq, pageable),HttpStatus.OK);
    }

    /**
     * 이미지 피드 생성 api
     * @param user
     * @param createFeedReq
     * @return {@link HttpStatus}
     * @throws IOException
     */
    @PostMapping("/upload/image")
    public ResponseEntity<HttpStatus> createFeed(@AuthenticationPrincipal User user ,@Validated CreateFeedReq createFeedReq) throws IOException {
        log.info("createFeedReq = {}",createFeedReq);
        feedService.postFeed(createFeedReq,user);
        return ResponseEntity.ok().build();
    }

    /**
     * 비디오 피드 생성 api
     * @param user
     * @param createFeedReq
     * @return {@link HttpStatus}
     * @throws IOException
     */
    @PostMapping("/upload/video")
    public ResponseEntity<HttpStatus> createVideoFeed(@AuthenticationPrincipal User user,@Validated CreateFeedReq createFeedReq) throws IOException {
        feedService.postVideoFeed(createFeedReq,user);
        return ResponseEntity.ok().build();
    }

    /**
     * 댓글 작성 api
     * @param user
     * @param createCommentReq
     * @return {@link HttpStatus}
     */
    @PostMapping("/comment")
    public ResponseEntity<HttpStatus> createComment(@AuthenticationPrincipal User user, @Validated @RequestBody CreateCommentReq createCommentReq){
        feedService.postComment(createCommentReq,user);
        return ResponseEntity.ok().build();
    }

    /**
     * 피드의 댓글 확인 api
     * @param feedId
     * @return {@link List<CommentRes>}
     */
    @GetMapping("/comment/{feedId}")
    public ResponseEntity<List<CommentRes>> readComment(@PathVariable Long feedId){
        log.info("feedId={}", feedId );
        return new ResponseEntity<>(feedService.getComment(feedId),HttpStatus.OK);
    }

    /**
     * 댓글 삭제 api
     * @param commentId
     * @return {@link HttpStatus}
     */
    @PutMapping("/comment/{commentId}")
    public ResponseEntity<HttpStatus> updateComment(@PathVariable Long commentId){
        feedService.putComment(commentId);
        return ResponseEntity.ok().build();
    }

    /**
     * 좋아요 api
     * @param user
     * @param likeReq
     * @return {@link HttpStatus}
     */
    @PostMapping("/like")
    public ResponseEntity<HttpStatus> createLike(@AuthenticationPrincipal User user,@Validated @RequestBody LikeReq likeReq){
        feedService.postLike(likeReq,user);
        return ResponseEntity.ok().build();
    }

    /**
     * 좋아요 취소 api
     * @param user
     * @param likeReq
     * @return {@link HttpStatus}
     */
    @DeleteMapping("/like/{feedId}")
    public ResponseEntity<HttpStatus> removeLike(@AuthenticationPrincipal User user, @PathVariable Long feedId){
        feedService.deleteLike(user, feedId);
        return ResponseEntity.ok().build();
    }

    /**
     * 필터 api
     * @return {@link QuestOptionRes}
     */
    @GetMapping("/option")
    public ResponseEntity<?> readOptionList(){
        return new ResponseEntity<>(feedService.getQuestList(), HttpStatus.OK);
    }



}
