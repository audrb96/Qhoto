package com.qhoto.qhoto_api.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.qhoto.qhoto_api.api.repository.*;
import com.qhoto.qhoto_api.domain.*;
import com.qhoto.qhoto_api.domain.type.CommentStatus;
import com.qhoto.qhoto_api.domain.type.FeedLikePK;
import com.qhoto.qhoto_api.domain.type.FeedStatus;
import com.qhoto.qhoto_api.dto.request.CreateCommentReq;
import com.qhoto.qhoto_api.dto.request.CreateFeedReq;
import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.request.LikeReq;
import com.qhoto.qhoto_api.dto.response.*;
import com.qhoto.qhoto_api.dto.type.LikeStatus;
import com.qhoto.qhoto_api.exception.NoFeedByIdException;
import com.qhoto.qhoto_api.exception.type.NoUserByIdException;
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


    private final AmazonS3Client amazonS3Client;
    private final S3Utils s3Utils;
    private final CommentRepository commentRepository;
    private final FeedRepository feedRepository;
    private final UserRepository userRepository;
    private final FeedLikeRepository feedLikeRepository;
    private final QuestRepository questRepository;

    private final ActiveDailyRepository activeDailyRepository;

    private final ActiveWeeklyRepository activeWeeklyRepository;

    private final ActiveMonthlyRepository activeMonthlyRepository;
    private final ExpRepository expRepository;


    public Page<FeedAllDto> getAllFeed(FeedAllReq feedAllReq, Pageable pageable){
        return feedRepository.findAllByCondition(feedAllReq, pageable);
    }

    public Page<FeedAllDto> getFeed(FeedAllReq feedAllReq, Pageable pageable) {
        return feedRepository.findByCondition(feedAllReq, pageable);
    }

    public FeedDetailRes getFeedDetail(Long feedId){

        Feed feed = feedRepository.findFeedById(feedId).orElseThrow(() -> new NoFeedByIdException("no feed by id"));
        Long userId = 1L;
        User user = userRepository.findUserById(userId).orElseThrow(()-> new NoUserByIdException("no user by id"));
        List<CommentRes> commentResList = getCommentList(feedId);

        FeedDetailRes feedDetailRes = FeedDetailRes.builder()
                .feedId(feedId)
                .userId(userId)
                .userImage(user.getImage())
                .nickName(user.getNickname())
                .feedImage(feed.getImage())
                .feedTime(feed.getTime())
                .questName(feed.getQuest().getName())
                .questType(feed.getQuest().getQuestType().toString())
                .questPoint(feed.getQuest().getScore())
                .expPoint(expRepository.findPointByUserId(userId))
                .likeCount(feedLikeRepository.countAllById(feedId))
                .likeStatus((feedLikeRepository.findById(userId).isPresent())?LikeStatus.LIKE:LikeStatus.UNLIKE)
                .commentList(commentResList)
                .build();

        return feedDetailRes;
    }

    private List<CommentRes> getCommentList(Long feedId) {
        List<Comment> commentList = commentRepository.findListById(feedId);
        List<CommentRes> commentResList = new ArrayList<>();
        for (Comment comment : commentList) {
            commentResList.add(CommentRes.builder()
                    .userId(comment.getUser().getId())
                    .commentContext(comment.getContext())
                    .commentTime(comment.getTime())
                    .build());
        }
        return commentResList;
    }

    public Page<FeedFriendDto> getFriendFeed(FeedAllReq feedAllReq, Pageable pageable){
        Long userId = 1L;
        return feedRepository.findByConditionAndUserId(feedAllReq, pageable, userId);
    }


    public void postFeed(CreateFeedReq createFeedReq) throws IOException {
        Quest quest = questRepository.findQuestById(createFeedReq.getQuestId());
        User user = userRepository.findUserById(createFeedReq.getUserId()).orElseThrow(()-> new NoUserByIdException("no user by id"));
        // 주소 직접 입력하지 말고 S3Utils.넣기
        String dirName = "https://dxg5pxu9dqf6e.cloudfront.net/feed/image/"+user.getEmail();
        S3upload(createFeedReq, quest, user, dirName);
    }

    public void postVideoFeed(CreateFeedReq createFeedReq) throws IOException {
        Quest quest = questRepository.findQuestById(createFeedReq.getQuestId());
        User user = userRepository.findUserById(createFeedReq.getUserId()).orElseThrow(()-> new NoUserByIdException("no user by id"));
        String dirName = "https://dxg5pxu9dqf6e.cloudfront.net/feed/video/"+user.getEmail();
        S3upload(createFeedReq, quest, user, dirName);

    }

    private void S3upload(CreateFeedReq createFeedReq, Quest quest, User user, String dirName) throws IOException {
        s3Utils.upload(createFeedReq.getFeedImage(),dirName);
        Feed feed = Feed.builder()
                .user(user)
                .quest(quest)
                .activeDaily(activeDailyRepository.findDailyById(createFeedReq.getActiveDailyId()))
                .activeWeekly(activeWeeklyRepository.findWeeklyById(createFeedReq.getActiveWeeklyId()))
                .activeMonthly(activeMonthlyRepository.findMonthlyById(createFeedReq.getActiveMonthlyId()))
                .image(dirName+"/"+createFeedReq.getFeedImage().getOriginalFilename())
                .time(LocalDateTime.now())
                .status(FeedStatus.U)
                .questName(quest.getName())
                .location(createFeedReq.getLocation())
                .typeCode(quest.getQuestType().getCode())
                .typeName(quest.getQuestType().getName())
                .score(quest.getScore())
                .difficulty(quest.getDifficulty())
                .duration(quest.getDuration())
                .build();
        Exp exp = expRepository.findAllByTypeCodeAndUserId(quest.getQuestType().getCode(),user.getId());
        exp.addPoint(quest.getScore());

        feedRepository.save(feed);
    }


    public void postComment(CreateCommentReq createCommentReq){

        Comment comment = Comment.builder()
                .feed(feedRepository.findFeedById(createCommentReq.getFeedId()).orElseThrow(() -> new NoFeedByIdException("no feed by id")))
                .user(userRepository.findUserById(createCommentReq.getUserId()).orElseThrow(()-> new NoUserByIdException("no user by id")))
                .context(createCommentReq.getCommentContext())
                .time(LocalDateTime.now())
                .status(CommentStatus.U)
                .build();
        commentRepository.save(comment);
    }

    public List<CommentRes> getComment(Long feedId){

        return getCommentList(feedId);
    }

    public void putComment(Long commentId){
        Comment comment = commentRepository.findCommentById(commentId);
        comment.changeCommentStatus(CommentStatus.D);
    }

    public void postLike(LikeReq likeReq){
        FeedLike feedLike = FeedLike.builder()
                .feed(feedRepository.findFeedById(likeReq.getFeedId()).orElseThrow(() -> new NoFeedByIdException("no feed by id")))
                .user(userRepository.findUserById(likeReq.getUserId()).orElseThrow(()-> new NoUserByIdException("no user by id")))
                .build();
        feedLikeRepository.save(feedLike);
    }

    @Modifying
    public void deleteLike(LikeReq likeReq){
        FeedLikePK feedLikePK = FeedLikePK.builder()
                .feed(feedRepository.findFeedById(likeReq.getFeedId()).orElseThrow(() -> new NoFeedByIdException("no feed by id")))
                .user(userRepository.findUserById(likeReq.getUserId()).orElseThrow(()-> new NoUserByIdException("no user by id")))
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
