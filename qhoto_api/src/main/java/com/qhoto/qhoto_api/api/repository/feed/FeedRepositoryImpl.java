package com.qhoto.qhoto_api.api.repository.feed;

import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.domain.type.FeedStatus;
import com.qhoto.qhoto_api.domain.type.QuestDuration;
import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.response.feed.FeedAllDto;
import com.qhoto.qhoto_api.dto.response.feed.FeedFriendDto;
import com.qhoto.qhoto_api.dto.response.feed.QFeedAllDto;
import com.qhoto.qhoto_api.dto.response.feed.QFeedFriendDto;
import com.qhoto.qhoto_api.dto.type.LikeStatus;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.qhoto.qhoto_api.domain.QComment.comment;
import static com.qhoto.qhoto_api.domain.QFeed.feed;
import static com.qhoto.qhoto_api.domain.QFeedLike.feedLike;
import static com.qhoto.qhoto_api.domain.QFriend.friend;
import static com.qhoto.qhoto_api.domain.QUser.user;
import static org.springframework.util.StringUtils.hasText;
@Slf4j
public class FeedRepositoryImpl implements FeedRepositoryCon{

    private final JPAQueryFactory jpaQueryFactory;

    public FeedRepositoryImpl(EntityManager em){
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

//    @Override
//    public Page<FeedAllDto> findAllByCondition(FeedAllReq feedAllReq, Pageable pageable){
//        return null;
//    }
    @Override
    public Page<FeedAllDto> findByCondition(User user, FeedAllReq feedAllReq, Pageable pageable) {
        List<FeedAllDto> feedList = jpaQueryFactory
                .select(new QFeedAllDto(
                        feed.id,
                        feed.image,
                        feed.feedType
                        ))
                .from(feed)
                .where(feedClassIn(feedAllReq.getCondition(),feedAllReq.getDuration()),
                        feedTypeEq(feedAllReq.getDuration()),feed.status.eq(FeedStatus.USING)
                )
                .orderBy(feed.time.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        
        JPAQuery<FeedAllDto> countQuery = jpaQueryFactory
                .select(Projections.constructor(FeedAllDto.class,
                        feed.id,
                        feed.image,
                        feed.feedType
                        ))
                .from(feed,feedLike,comment)
                .where(feedClassIn(feedAllReq.getCondition(),feedAllReq.getDuration()),
                        feedTypeEq(feedAllReq.getDuration()),feed.status.eq(FeedStatus.USING)
                )
                .orderBy(orderFirstByUserId(user.getId()),feed.time.desc())
                ;
        return PageableExecutionUtils.getPage(feedList, pageable, countQuery::fetchCount);
    }

    @Override
    public Page<FeedFriendDto> findByConditionAndUserId(FeedAllReq feedAllReq, Pageable pageable, Long userId) {
        List<FeedFriendDto> feedFriendList = jpaQueryFactory
                .select(new QFeedFriendDto(feed.id,
                        user.id,
                        feed.image,
//                        feed.time,
                        Expressions.dateTemplate(String.class,"DATE_FORMAT({0},{1})",feed.time, ConstantImpl.create("%Y-%m-%d %p %h:%i")),
                        feed.questName,
                        feed.quest.questType.code,
                        feed.quest.score,
                        user.expGrade,
                        user.totalExp,
                        new CaseBuilder().when(JPAExpressions.select(feedLike).from(feedLike).where(feedLike.feed.id.eq(feed.id),feedLike.user.id.eq(userId)).exists()).then(LikeStatus.LIKE.getValue()).otherwise(LikeStatus.UNLIKE.getValue()).as("likeStatus"),
                        ExpressionUtils.as(JPAExpressions.select(feedLike.count()).from(feedLike).where(feedLike.feed.id.eq(feed.id)),"likeCount"),
                        user.nickname,
                        comment.user.nickname,
                        comment.user.image,
                        user.image,
                        Expressions.dateTemplate(String.class,"DATE_FORMAT({0},{1})",comment.time, ConstantImpl.create("%Y-%m-%d %p %h:%i")),
                        comment.context,
                        feed.feedType,
                        ExpressionUtils.as(JPAExpressions.select(comment.count()).from(comment).where(comment.feed.id.eq(feed.id)),"commentCnt")))
                .from(feed,user,comment)
                .rightJoin(comment.user, user)
                .rightJoin(comment.feed, feed)
                .rightJoin(feed.user, user)
                .where(
                        feedClassIn(feedAllReq.getCondition(),feedAllReq.getDuration()),
                        feedTypeEq(feedAllReq.getDuration())
                        ,user.id.in(JPAExpressions.select(friend.followee.id).from(friend).where(friend.follower.id.eq(userId))).or(user.id.eq(userId))
                        ,feed.status.eq(FeedStatus.USING)
                )
                .groupBy(feed.id)
                .orderBy(orderFirstByUserId(userId),feed.time.desc())
                .fetch();
        feedFriendList.forEach((feedFriendDto -> {
            feedFriendDto.setFeedTime(feedFriendDto.getFeedTime().replace("AM", "오전").replace("PM", "오후"));
           if(StringUtils.hasText(feedFriendDto.getTime())) feedFriendDto.setTime(feedFriendDto.getTime().replace("AM","오전").replace("PM", "오후"));
        }));

        JPAQuery<FeedFriendDto> countQuery = jpaQueryFactory
                .select(new QFeedFriendDto(feed.id,
                        user.id,
                        feed.image,
                        Expressions.dateTemplate(String.class,"DATE_FORMAT({0},{1})",feed.time, ConstantImpl.create("%Y-%m-%d %h:%i")),
                        feed.questName,
                        feed.quest.questType.code,
                        feed.quest.score,
                        user.expGrade,
                        user.totalExp,
                        new CaseBuilder().when(JPAExpressions.select(feedLike).from(feedLike,feed).where(feedLike.feed.id.eq(feed.id),feedLike.user.id.eq(userId)).exists()).then(LikeStatus.LIKE.getValue()).otherwise(LikeStatus.UNLIKE.getValue()).as("likeStatus"),
                        ExpressionUtils.as(JPAExpressions.select(feedLike.count()).from(feedLike).where(feedLike.feed.id.eq(feed.id)),"likeCount"),
                        user.nickname,
                        comment.user.nickname,
                        comment.user.image,
                        user.image,
                        Expressions.dateTemplate(String.class,"DATE_FORMAT({0},{1})",comment.time, ConstantImpl.create("%Y-%m-%d %h:%i")),
                        comment.context,
                        feed.feedType,
                        ExpressionUtils.as(JPAExpressions.select(comment.count()).from(comment).where(comment.feed.id.eq(feed.id)),"commentCnt")
                        ))
                .from(feed,user,comment)
                .rightJoin(comment.user, user)
                .rightJoin(comment.feed, feed)
                .rightJoin(feed.user, user)
                .where(
                        feedClassIn(feedAllReq.getCondition(),feedAllReq.getDuration()),
                        feedTypeEq(feedAllReq.getDuration())
                        ,user.id.in(JPAExpressions.select(friend.followee.id).from(friend).where(friend.follower.id.eq(userId)))
                        ,feed.status.eq(FeedStatus.USING)
                ).groupBy(feed.id)
                .orderBy(feed.time.desc());
        return PageableExecutionUtils.getPage(feedFriendList, pageable, countQuery::fetchCount);
    }

    private OrderSpecifier<?> orderFirstByUserId(Long userId) {
        NumberExpression<Integer> sortRank = new CaseBuilder()
                .when(user.id.eq(userId)).then(1).otherwise(2);
        return sortRank.asc();
    }


    private BooleanExpression feedTypeEq(String duration) {
        QuestDuration qd = null;

        if(duration.equals("D")) qd = QuestDuration.DAY;
        else if(duration.equals("W")) qd = QuestDuration.WEEK;
        else if(duration.equals("M")) qd = QuestDuration.MONTH;

        return hasText(duration)? feed.duration.eq(qd):null;
    }

    private BooleanExpression feedClassIn(String condition, String duration) {
        List<Long> conList = new ArrayList<>();
        if(hasText(condition)){
            conList = Arrays.stream(condition.split(",")).map(Long::parseLong).collect(Collectors.toList());
        }
        if(duration.equals("D")){
            return feed.activeDaily.id.in(conList);
        } else if (duration.equals("W")) {
            return feed.activeWeekly.id.in(conList);
        }
        return feed.activeMonthly.id.in(conList);
    }
}
