package com.qhoto.qhoto_api.api.controller;


import com.qhoto.qhoto_api.api.service.FeedService;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.CreateCommentReq;
import com.qhoto.qhoto_api.dto.request.CreateFeedReq;
import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.request.LikeReq;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @GetMapping("/all/{feedId}")
    public ResponseEntity<?> readFeedDetail(@PathVariable Long feedId){
        return new ResponseEntity<>(feedService.getFeedDetail(feedId), HttpStatus.OK);
    }

    @GetMapping("/friend")
    public ResponseEntity<?> readFriendFeed(@AuthenticationPrincipal User user, @ModelAttribute FeedAllReq feedAllReq, Pageable pageable){
        log.info("FeedAllReq = {}" , feedAllReq);
        return new ResponseEntity<>(feedService.getFriendFeed(user, feedAllReq, pageable),HttpStatus.OK);
    }

    @PostMapping("/upload/image")
    public ResponseEntity<HttpStatus> createFeed(@AuthenticationPrincipal User user ,@Validated CreateFeedReq createFeedReq) throws IOException {
        log.info("createFeedReq = {}",createFeedReq);
        feedService.postFeed(createFeedReq,user);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/upload/video")
    public ResponseEntity<HttpStatus> createVideoFeed(@AuthenticationPrincipal User user,@Validated CreateFeedReq createFeedReq) throws IOException {
        feedService.postVideoFeed(createFeedReq,user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/comment")
    public ResponseEntity<HttpStatus> createComment(@AuthenticationPrincipal User user, @Validated @RequestBody CreateCommentReq createCommentReq){
        feedService.postComment(createCommentReq,user);
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
    public ResponseEntity<HttpStatus> createLike(@AuthenticationPrincipal User user,@Validated @RequestBody LikeReq likeReq){
        feedService.postLike(likeReq,user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/like")
    public ResponseEntity<HttpStatus> removeLike(@AuthenticationPrincipal User user,@Validated @RequestBody LikeReq likeReq){
        feedService.deleteLike(likeReq,user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/option")
    public ResponseEntity<?> readOptionList(){
        return new ResponseEntity<>(feedService.getQuestList(), HttpStatus.OK);
    }



}
