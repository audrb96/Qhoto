package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.activequest.ActiveDailyRepository;
import com.qhoto.qhoto_api.api.repository.activequest.ActiveMonthlyRepository;
import com.qhoto.qhoto_api.api.repository.activequest.ActiveWeeklyRepository;
import com.qhoto.qhoto_api.api.repository.feed.*;
import com.qhoto.qhoto_api.api.repository.quest.QuestRepository;
import com.qhoto.qhoto_api.api.repository.user.UserRepository;
import com.qhoto.qhoto_api.domain.*;
import com.qhoto.qhoto_api.domain.type.CommentStatus;
import com.qhoto.qhoto_api.domain.type.FeedLikePK;
import com.qhoto.qhoto_api.domain.type.FeedStatus;
import com.qhoto.qhoto_api.domain.type.FeedType;
import com.qhoto.qhoto_api.dto.request.CreateCommentReq;
import com.qhoto.qhoto_api.dto.request.CreateFeedReq;
import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.request.LikeReq;
import com.qhoto.qhoto_api.dto.response.feed.CommentRes;
import com.qhoto.qhoto_api.dto.response.feed.FeedAllDto;
import com.qhoto.qhoto_api.dto.response.feed.FeedDetailRes;
import com.qhoto.qhoto_api.dto.response.feed.FeedFriendDto;
import com.qhoto.qhoto_api.dto.response.quest.QuestOptionItemRes;
import com.qhoto.qhoto_api.dto.response.quest.QuestOptionRes;
import com.qhoto.qhoto_api.dto.type.LikeStatus;
import com.qhoto.qhoto_api.exception.NoFeedByIdException;
import com.qhoto.qhoto_api.exception.NoQuestByIdException;
import com.qhoto.qhoto_api.exception.NoUserByIdException;
import com.qhoto.qhoto_api.util.S3Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    private final ExpGradeRepository expGradeRepository;
    private final ActiveWeeklyRepository activeWeeklyRepository;
    private final ActiveMonthlyRepository activeMonthlyRepository;
    private final ExpRepository expRepository;



    // 전체 피드 불러오기
    public Page<FeedAllDto> getFeed(User user, FeedAllReq feedAllReq, Pageable pageable) {
        return feedRepository.findByCondition(user,feedAllReq, pageable);
    }

    // 피드 세부 사항 불러오기
    public FeedDetailRes getFeedDetail(Long feedId, User userInfo){

        // 피드 정보 얻기
        Feed feed = feedRepository.findFeedById(feedId).orElseThrow(() -> new NoFeedByIdException("no feed by id"));
        // 유저 정보 얻기
        User user = userRepository.findUserById(feed.getUser().getId()).orElseThrow(()-> new NoUserByIdException("no user by id"));
        // 댓글리스트 불러오기
        List<CommentRes> commentResList = getCommentList(feedId);
        // 피드 세부 정보 생성
        FeedDetailRes feedDetailRes = FeedDetailRes.builder()
                .feedId(feedId)
                .userId(user.getId())
                .userImage(user.getImage())
                .nickname(user.getNickname())
                .feedImage(feed.getImage())
                .feedTime(feed.getTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .questName(feed.getQuest().getName())
                .questType(feed.getQuest().getQuestType().getCode())
                .questPoint(feed.getQuest().getScore())
                .expGrade(user.getExpGrade())
                .expPoint(user.getTotalExp())
                .likeCount(feedLikeRepository.countAllById(feedId).orElseThrow(()-> new NoFeedByIdException("no feed by id")))
                .likeStatus((feedLikeRepository.findById(userInfo.getId(),feed.getId()).isPresent())?LikeStatus.LIKE:LikeStatus.UNLIKE)
                .commentList(commentResList)
                .feedType(feed.getFeedType())
                .build();

        return feedDetailRes;
    }

    // 댓글리스트 불러오기
    private List<CommentRes> getCommentList(Long feedId) {
        // 댓글 정보 얻기
        List<Comment> commentList = commentRepository.findListById(feedId);
        List<CommentRes> commentResList = new ArrayList<>();
        // 댓글리스트 생성
        for (Comment comment : commentList) {
            commentResList.add(CommentRes.builder()
                    .userId(comment.getUser().getId())
                    .nickname(comment.getUser().getNickname())
                    .userImage(comment.getUser().getImage())
                    .commentContext(comment.getContext())
                    .commentTime(comment.getTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .build());
        }
        return commentResList;
    }

    // 친구 피드 불러오기
    public Page<FeedFriendDto> getFriendFeed(User user, FeedAllReq feedAllReq, Pageable pageable){
        return feedRepository.findByConditionAndUserId(feedAllReq, pageable, user.getId());
    }


    // 사진 피드 작성하기
    public void postFeed(CreateFeedReq createFeedReq,User userInfo) throws IOException {
        // 퀘스트 정보 받아오기
        Quest quest = questRepository.findQuestById(createFeedReq.getQuestId()).orElseThrow(()-> new NoQuestByIdException("no quest by id"));
        // 유저 정보 받아오기
        User user = userRepository.findUserById(userInfo.getId()).orElseThrow(()-> new NoUserByIdException("no user by id"));
        String dirName = "feed/image/"+user.getEmail();
        // S3에 upload 하기
        S3upload(createFeedReq, quest, user, dirName, FeedType.IMAGE);
    }

    // 비디오 피드 작성하기
    public void postVideoFeed(CreateFeedReq createFeedReq,User userInfo) throws IOException {
        // 퀘스트 정보 받아오기
        Quest quest = questRepository.findQuestById(createFeedReq.getQuestId()).orElseThrow(()-> new NoQuestByIdException("no quest by id"));;
        // 유저 정보 받아오기
        User user = userRepository.findUserById(userInfo.getId()).orElseThrow(()-> new NoUserByIdException("no user by id"));
        String dirName = "feed/video/input/"+user.getEmail();
        // S3에 upload 하기
        S3upload(createFeedReq, quest, user, dirName, FeedType.VIDEO);

    }

    // S3에 upload 하기
    private void S3upload(CreateFeedReq createFeedReq, Quest quest, User user, String dirName, FeedType feedType) throws IOException {
        s3Utils.upload(createFeedReq.getFeedImage(),dirName);
        // DB에는 클라우드 프론트 도메인 이름을 앞에 붙여서 넣어주기
        dirName = S3Utils.CLOUD_FRONT_DOMAIN_NAME+"/"+dirName;
        // 피드 생성
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
        // 경험치 가져오기
        Exp exp = expRepository.findAllByTypeCodeAndUserId(quest.getQuestType().getCode(),user.getId());
        // 경험지 변경
        exp.addPoint(quest.getScore());
        // 유저 테이블 변경
        user.addTotalExp(exp.getPoint());
        PageRequest pageRequest = PageRequest.of(0,1);
        List<ExpGrade> expGrade = expGradeRepository.findByBoundaryPoint(user.getTotalExp(), pageRequest);
        user.updateGrade(expGrade.get(0).getGradeName());
        // 피드 저장
        feedRepository.save(feed);
    }

    //피드 삭제
    public void deleteFeed(Long feedId) {
        feedRepository.deleteFeedByfeedId(feedId);
    }


    // 댓글 등록
    public void postComment(CreateCommentReq createCommentReq, User user){
        // 댓글 생성
        Comment comment = Comment.builder()
                .feed(feedRepository.findFeedById(createCommentReq.getFeedId()).orElseThrow(() -> new NoFeedByIdException("no feed by id")))
                .user(userRepository.findUserById(user.getId()).orElseThrow(()-> new NoUserByIdException("no user by id")))
                .context(createCommentReq.getCommentContext())
                .time(LocalDateTime.now())
                .status(CommentStatus.USING)
                .build();
        // 댓글 저장
        commentRepository.save(comment);
    }

    // 댓글 불러오기
    public List<CommentRes> getComment(Long feedId){
        return getCommentList(feedId);
    }

    // 댓글 삭제하기
    public void putComment(Long commentId){
        // 댓글 가져오기
        Comment comment = commentRepository.findCommentById(commentId);
        // 댓글 상태 변경하기
        comment.changeCommentStatus(CommentStatus.DISABLE);
    }

    // 피드 좋아요 누르기
    public void postLike(LikeReq likeReq, User user){
        // 피드 좋아요 생성
        FeedLike feedLike = FeedLike.builder()
                .feed(feedRepository.findFeedById(likeReq.getFeedId()).orElseThrow(() -> new NoFeedByIdException("no feed by id")))
                .user(userRepository.findUserById(user.getId()).orElseThrow(()-> new NoUserByIdException("no user by id")))
                .build();
        // 피드 좋아요 저장
        feedLikeRepository.save(feedLike);
    }

    // 피드 좋아요 삭제
    @Modifying
    public void deleteLike(User user, Long feedId){
        // 피드 좋아요 생성
        FeedLikePK feedLikePK = FeedLikePK.builder()
                .feed(feedRepository.findFeedById(feedId).orElseThrow(() -> new NoFeedByIdException("no feed by id")))
                .user(userRepository.findUserById(user.getId()).orElseThrow(()-> new NoUserByIdException("no user by id")))
                .build();
        // 피드 좋아요 삭제
        feedLikeRepository.deleteById(feedLikePK);
    }

    public QuestOptionRes getQuestList() {

        // 퀘스트 옵션 리스트 담아줄 Map 생성
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
