package com.qhoto.qhoto_api.api.controller;


import com.qhoto.qhoto_api.api.service.FeedService;
import com.qhoto.qhoto_api.dto.request.CreateCommentReq;
import com.qhoto.qhoto_api.dto.request.CreateFeedReq;
import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.request.LikeReq;
import com.qhoto.qhoto_api.dto.response.ErrorResponse;
import com.qhoto.qhoto_api.exception.NoFeedByIdException;
import com.qhoto.qhoto_api.exception.type.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/feed")
public class FeedController {

    private final FeedService feedService;



//    @GetMapping
//    public ResponseEntity<?> readAllFeed(@ModelAttribute FeedAllReq feedAllReq, Pageable pageable){
//        return new ResponseEntity<>(feedService.getAllFeed(feedAllReq, pageable),HttpStatus.OK);
//    }
    @GetMapping("/all")
    public ResponseEntity<?> readFeed(@ModelAttribute FeedAllReq feedAllReq, Pageable pageable){
        return new ResponseEntity<>(feedService.getFeed(feedAllReq, pageable),HttpStatus.OK);
    }

    @GetMapping("/all/{feedId}")
    public ResponseEntity<?> readFeedDetail(@PathVariable Long feedId){
        return new ResponseEntity<>(feedService.getFeedDetail(feedId), HttpStatus.OK);
    }
    @GetMapping("/friend")
    public ResponseEntity<?> readFriendFeed(@ModelAttribute FeedAllReq feedAllReq, Pageable pageable){
        log.info("FeedAllReq = {}" , feedAllReq);
        return new ResponseEntity<>(feedService.getFriendFeed(feedAllReq, pageable),HttpStatus.OK);
    }

    @PostMapping("/upload/image")
    public ResponseEntity<HttpStatus> createFeed(@Validated CreateFeedReq createFeedReq) throws IOException {
        log.info("createFeedReq = {}",createFeedReq);
        feedService.postFeed(createFeedReq);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/upload/video")
    public ResponseEntity<HttpStatus> createVideoFeed(@Validated CreateFeedReq createFeedReq) throws IOException {
        feedService.postVideoFeed(createFeedReq);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/comment")
    public ResponseEntity<HttpStatus> createComment(@Validated @RequestBody CreateCommentReq createCommentReq){
        feedService.postComment(createCommentReq);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/comment/{feedId}")
    public ResponseEntity<?> readComment(@PathVariable Long feedId){
        log.info("feedId={}", feedId );
        return new ResponseEntity<>(feedService.getComment(feedId),HttpStatus.OK);
    }

    @PutMapping("/comment/{commentId}")
    public ResponseEntity<HttpStatus> updateComment(@PathVariable Long commentId){
        feedService.putComment(commentId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/like")
    public ResponseEntity<HttpStatus> createLike(@Validated @RequestBody LikeReq likeReq){
        feedService.postLike(likeReq);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/like")
    public ResponseEntity<HttpStatus> removeLike(@Validated @RequestBody LikeReq likeReq){
        feedService.deleteLike(likeReq);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/option")
    public ResponseEntity<?> readOptionList(){
        return new ResponseEntity<>(feedService.getQuestList(), HttpStatus.OK);
    }



}