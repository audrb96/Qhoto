package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.*;
import com.qhoto.qhoto_api.domain.*;
import com.qhoto.qhoto_api.domain.type.CommentStatus;
import com.qhoto.qhoto_api.domain.type.FeedLikePK;
import com.qhoto.qhoto_api.domain.type.FeedStatus;
import com.qhoto.qhoto_api.domain.type.FeedType;
import com.qhoto.qhoto_api.dto.request.CreateCommentReq;
import com.qhoto.qhoto_api.dto.request.CreateFeedReq;
import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.request.LikeReq;
import com.qhoto.qhoto_api.dto.response.*;
import com.qhoto.qhoto_api.dto.type.LikeStatus;
import com.qhoto.qhoto_api.exception.NoFeedByIdException;
import com.qhoto.qhoto_api.exception.NoQuestByIdException;
import com.qhoto.qhoto_api.exception.NoUserByIdException;
import com.qhoto.qhoto_api.util.S3Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
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
    private final ExpRepository expRepository;



    public Page<FeedAllDto> getFeed(User user,FeedAllReq feedAllReq, Pageable pageable) {
        return feedRepository.findByCondition(user,feedAllReq, pageable);
    }

    public FeedDetailRes getFeedDetail(Long feedId, User userInfo){

        Feed feed = feedRepository.findFeedById(feedId).orElseThrow(() -> new NoFeedByIdException("no feed by id"));
        User user = userRepository.findUserById(feed.getUser().getId()).orElseThrow(()-> new NoUserByIdException("no user by id"));
        List<CommentRes> commentResList = getCommentList(feedId);

        FeedDetailRes feedDetailRes = FeedDetailRes.builder()
                .feedId(feedId)
                .userId(user.getId())
                .userImage(user.getImage())
                .nickName(user.getNickname())
                .feedImage(feed.getImage())
                .feedTime(feed.getTime())
                .questName(feed.getQuest().getName())
                .questType(feed.getQuest().getQuestType().getCode())
                .questPoint(feed.getQuest().getScore())
                .expPoint(expRepository.findPointByUserId(user.getId()).orElseThrow(()-> new NoUserByIdException("no user by id")))
                .likeCount(feedLikeRepository.countAllById(feedId).orElseThrow(()-> new NoFeedByIdException("no feed by id")))
                .likeStatus((feedLikeRepository.findById(userInfo.getId(),feed.getId()).isPresent())?LikeStatus.LIKE:LikeStatus.UNLIKE)
                .commentList(commentResList)
                .feedType(feed.getFeedType())
                .build();

        return feedDetailRes;
    }

    private List<CommentRes> getCommentList(Long feedId) {
        List<Comment> commentList = commentRepository.findListById(feedId);
        List<CommentRes> commentResList = new ArrayList<>();
        for (Comment comment : commentList) {
            commentResList.add(CommentRes.builder()
                    .userId(comment.getUser().getId())
                    .nickName(comment.getUser().getNickname())
                    .commentContext(comment.getContext())
                    .commentTime(comment.getTime())
                    .build());
        }
        return commentResList;
    }

    public Page<FeedFriendDto> getFriendFeed(User user,FeedAllReq feedAllReq, Pageable pageable){
        return feedRepository.findByConditionAndUserId(feedAllReq, pageable, user.getId());
    }


    public void postFeed(CreateFeedReq createFeedReq,User userInfo) throws IOException {
        Quest quest = questRepository.findQuestById(createFeedReq.getQuestId()).orElseThrow(()-> new NoQuestByIdException("no quest by id"));
        User user = userRepository.findUserById(userInfo.getId()).orElseThrow(()-> new NoUserByIdException("no user by id"));
        String dirName = "feed/image/"+user.getEmail();
        S3upload(createFeedReq, quest, user, dirName, FeedType.IMAGE);
    }

    public void postVideoFeed(CreateFeedReq createFeedReq,User userInfo) throws IOException {
        Quest quest = questRepository.findQuestById(createFeedReq.getQuestId()).orElseThrow(()-> new NoQuestByIdException("no quest by id"));;

        User user = userRepository.findUserById(userInfo.getId()).orElseThrow(()-> new NoUserByIdException("no user by id"));
        String dirName = "feed/video/input/"+user.getEmail();
        S3upload(createFeedReq, quest, user, dirName, FeedType.VIDEO);

    }

    private void S3upload(CreateFeedReq createFeedReq, Quest quest, User user, String dirName, FeedType feedType) throws IOException {
        s3Utils.upload(createFeedReq.getFeedImage(),dirName);
        dirName = S3Utils.CLOUD_FRONT_DOMAIN_NAME+"/"+dirName;
        Feed feed = Feed.builder()
                .user(user)
                .quest(quest)
                .activeDaily(activeDailyRepository.findDailyById(createFeedReq.getActiveDailyId()))
                .activeWeekly(activeWeeklyRepository.findWeeklyById(createFeedReq.getActiveWeeklyId()))
                .activeMonthly(activeMonthlyRepository.findMonthlyById(createFeedReq.getActiveMonthlyId()))
                .image(dirName+"/"+createFeedReq.getFeedImage().getOriginalFilename())
                .time(LocalDateTime.now())
                .status(FeedStatus.USING)
                .questName(quest.getName())
                .location(createFeedReq.getLocation())
                .typeCode(quest.getQuestType().getCode())
                .typeName(quest.getQuestType().getName())
                .score(quest.getScore())
                .difficulty(quest.getDifficulty())
                .duration(quest.getDuration())
                .feedType(feedType)
                .build();
        Exp exp = expRepository.findAllByTypeCodeAndUserId(quest.getQuestType().getCode(),user.getId());
        exp.addPoint(quest.getScore());

        feedRepository.save(feed);
    }


    public void postComment(CreateCommentReq createCommentReq, User user){

        Comment comment = Comment.builder()
                .feed(feedRepository.findFeedById(createCommentReq.getFeedId()).orElseThrow(() -> new NoFeedByIdException("no feed by id")))
                .user(userRepository.findUserById(user.getId()).orElseThrow(()-> new NoUserByIdException("no user by id")))
                .context(createCommentReq.getCommentContext())
                .time(LocalDateTime.now())
                .status(CommentStatus.USING)
                .build();

        commentRepository.save(comment);
    }

    public List<CommentRes> getComment(Long feedId){

        return getCommentList(feedId);
    }

    public void putComment(Long commentId){
        Comment comment = commentRepository.findCommentById(commentId);
        comment.changeCommentStatus(CommentStatus.DISABLE);
    }

    public void postLike(LikeReq likeReq, User user){
        FeedLike feedLike = FeedLike.builder()
                .feed(feedRepository.findFeedById(likeReq.getFeedId()).orElseThrow(() -> new NoFeedByIdException("no feed by id")))
                .user(userRepository.findUserById(user.getId()).orElseThrow(()-> new NoUserByIdException("no user by id")))
                .build();
        feedLikeRepository.save(feedLike);
    }

    @Modifying
    public void deleteLike(LikeReq likeReq,User user){
        FeedLikePK feedLikePK = FeedLikePK.builder()
                .feed(feedRepository.findFeedById(likeReq.getFeedId()).orElseThrow(() -> new NoFeedByIdException("no feed by id")))
                .user(userRepository.findUserById(user.getId()).orElseThrow(()-> new NoUserByIdException("no user by id")))
                .build();
        feedLikeRepository.deleteById(feedLikePK);
    }

    public QuestOptionRes getQuestList() {

        // 옵션 리스트
        Map<String, List<QuestOptionItemRes>> optionList = new HashMap<>();
        List<QuestOptionItemRes> dailyOptions = questRepository.findAllDailyByQuestIdAndStatus();
        List<QuestOptionItemRes> weeklyOptions = questRepository.findAllWeeklyByQuestIdAndStatus();
        List<QuestOptionItemRes> monthlyOptions = questRepository.findAllMonthlyByQuestIdAndStatus();
        optionList.put("dailyOptions", dailyOptions);
        optionList.put("weeklyOptions", weeklyOptions);
        optionList.put("monthlyOptions", monthlyOptions);

        // QuestOptionRes 빌드
        QuestOptionRes QO = QuestOptionRes.builder()
                .options(optionList)
                .build();
        return QO;
    }
}
