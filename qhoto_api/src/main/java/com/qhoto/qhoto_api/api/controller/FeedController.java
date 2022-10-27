package com.qhoto.qhoto_api.api.controller;


import com.qhoto.qhoto_api.api.service.FeedService;
import com.qhoto.qhoto_api.dto.request.CreateCommentReq;
import com.qhoto.qhoto_api.dto.request.CreateFeedReq;
import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.request.LikeReq;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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


    @GetMapping
    public ResponseEntity<?> readAllFeed(@RequestBody FeedAllReq feedAllReq){
        return new ResponseEntity<>(feedService.getAllFeed(feedAllReq),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<HttpStatus> createFeed(@Validated @RequestBody CreateFeedReq createFeedReq) throws IOException {
        feedService.postFeed(createFeedReq);
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


}
