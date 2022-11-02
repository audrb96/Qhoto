package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.*;
import com.qhoto.qhoto_api.domain.Comment;
import com.qhoto.qhoto_api.domain.Feed;
import com.qhoto.qhoto_api.domain.FeedLike;
import com.qhoto.qhoto_api.domain.Quest;
import com.qhoto.qhoto_api.domain.type.CommentStatus;
import com.qhoto.qhoto_api.domain.type.FeedLikePK;
import com.qhoto.qhoto_api.domain.type.FeedStatus;
import com.qhoto.qhoto_api.dto.request.CreateCommentReq;
import com.qhoto.qhoto_api.dto.request.CreateFeedReq;
import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.request.LikeReq;
import com.qhoto.qhoto_api.dto.response.CommentRes;
import com.qhoto.qhoto_api.dto.response.FeedAllDto;
import com.qhoto.qhoto_api.dto.response.QuestOptionRes;
import com.qhoto.qhoto_api.dto.response.FeedDetailRes;
import com.qhoto.qhoto_api.dto.type.LikeStatus;
import com.qhoto.qhoto_api.exception.NoFeedByIdException;
import com.qhoto.qhoto_api.util.S3Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedService {

    private final S3Utils s3Utils;
    private final CommentRepository commentRepository;
    private final FeedRepository feedRepository;
    private final UserRepository userRepository;
    private final FeedLikeRepository feedLikeRepository;
    private final QuestRepository questRepository;

    private final ActiveDailyRepository activeDailyRepository;

    private final ActiveWeeklyRepository activeWeeklyRepository;

    private final ActiveMonthlyRepository activeMonthlyRepository;



    public Page<FeedAllDto> getAllFeed(FeedAllReq feedAllReq, Pageable pageable) {
        return feedRepository.findByCondition(feedAllReq, pageable);
    }

    public FeedDetailRes getFeedDetail(Long feedId){

        Feed feed = feedRepository.findFeedById(feedId).orElseThrow(() -> new NoFeedByIdException("no feed by id"));
        Long userId = 1L;
        FeedDetailRes feedDetailRes = FeedDetailRes.builder()
                .feedId(feedId)
                .feedImage(feed.getImage())
                .feedTime(feed.getTime())
                .questName(feed.getQuest().getName())
                .questType(feed.getQuest().getQuestType().toString())
                .questPoint(feed.getQuest().getScore())
                .likeCount(feedLikeRepository.countAllById(feedId))
                .likeStatus((feedLikeRepository.findById(userId).isPresent())?LikeStatus.LIKE:LikeStatus.UNLIKE)
                .build();
        return feedDetailRes;
    }



    public void postFeed(CreateFeedReq createFeedReq) throws IOException {
        Quest quest = questRepository.findQuestById(createFeedReq.getQuestId());
        String uuid = UUID.randomUUID().toString();
        String dirName = "feed/"+uuid;
        s3Utils.upload(createFeedReq.getFeedImage(),dirName);

        Feed feed = Feed.builder()
                .user(userRepository.findUserById(createFeedReq.getUserId()))
                .quest(quest)
                .image(dirName+"/"+createFeedReq.getFeedImage().getOriginalFilename())
                .time(LocalDateTime.now())
                .status(FeedStatus.U)
                .location(createFeedReq.getLocation())
                .typeCode(quest.getQuestType().toString())
                .score(quest.getScore())
                .difficulty(quest.getDifficulty())
                .duration(quest.getDuration())
                .build();
        feedRepository.save(feed);
    }

    public void postComment(CreateCommentReq createCommentReq){

        Comment comment = Comment.builder()
                .feed(feedRepository.findFeedById(createCommentReq.getFeedId()).orElseThrow(() -> new NoFeedByIdException("no feed by id")))
                .user(userRepository.findUserById(createCommentReq.getUserId()))
                .context(createCommentReq.getCommentContext())
                .time(LocalDateTime.now())
                .status(CommentStatus.U)
                .build();
        commentRepository.save(comment);
    }

    public List<CommentRes> getComment(Long feedId){

        List<Comment> commentList = commentRepository.findListById(feedId);
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
                .feed(feedRepository.findFeedById(likeReq.getFeedId()).orElseThrow(() -> new NoFeedByIdException("no feed by id")))
                .user(userRepository.findUserById(likeReq.getUserId()))
                .build();
        feedLikeRepository.save(feedLike);
    }

    @Modifying
    public void deleteLike(LikeReq likeReq){
        FeedLikePK feedLikePK = FeedLikePK.builder()
                .feed(feedRepository.findFeedById(likeReq.getFeedId()).orElseThrow(() -> new NoFeedByIdException("no feed by id")))
                .user(userRepository.findUserById(likeReq.getUserId()))
                .build();
        feedLikeRepository.deleteById(feedLikePK);
    }

    public Map<String, Object> getQuestList() {
        List<QuestOptionRes> dailyOptions = activeDailyRepository.findAllByQuestIdAndStatus();
        List<QuestOptionRes> weeklyOptions = activeWeeklyRepository.findAllByQuestIdAndStatus();
        List<QuestOptionRes> monthlyOptions = activeMonthlyRepository.findAllByQuestIdAndStatus();
        Map<String, Object> optionList = new HashMap<>();
        optionList.put("dailyOptions", dailyOptions);
        optionList.put("weeklyOptions", weeklyOptions);
        optionList.put("monthlyOptions", monthlyOptions);
        return optionList;
    }
}
