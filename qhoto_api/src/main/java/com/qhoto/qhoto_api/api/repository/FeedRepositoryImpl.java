package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.type.QuestDuration;
import com.qhoto.qhoto_api.dto.response.FeedAllDto;
import com.qhoto.qhoto_api.dto.response.FeedAllRes;
import com.qhoto.qhoto_api.dto.response.QFeedAllDto;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static com.qhoto.qhoto_api.domain.QFeed.feed;
import static org.springframework.util.StringUtils.hasText;

public class FeedRepositoryImpl implements FeedRepositoryCon{

    private final JPAQueryFactory jpaQueryFactory;

    public FeedRepositoryImpl(EntityManager em){
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public FeedAllRes findByCondition(String condition) {
        FeedAllRes feedAllRes;
        List<FeedAllDto> feedDailyList = jpaQueryFactory
                .select(new QFeedAllDto(
                        feed.id,
                        feed.image))
                .from(feed)
                .where(feedClassIn(condition),
                        feedTypeEq("D"))
                .fetch();
        List<FeedAllDto> feedWeeklyList = jpaQueryFactory
                .select(new QFeedAllDto(
                        feed.id,
                        feed.image))
                .from(feed)
                .where(feedClassIn(condition),
                        feedTypeEq("W"))
                .fetch();
        List<FeedAllDto> feedMonthlyList = jpaQueryFactory
                .select(new QFeedAllDto(
                        feed.id,
                        feed.image))
                .from(feed)
                .where(feedClassIn(condition),
                        feedTypeEq("M"))
                .fetch();
        feedAllRes = new FeedAllRes(feedDailyList,feedWeeklyList,feedMonthlyList);
        return feedAllRes;


    }

    private BooleanExpression feedTypeEq(String duration) {
        QuestDuration qd = null;

        if(duration.equals("D")) qd = QuestDuration.D;
        else if(duration.equals("W")) qd = QuestDuration.W;
        else if(duration.equals("M")) qd = QuestDuration.M;

        return hasText(duration)? feed.duration.eq(qd):null;
    }

    private BooleanExpression feedClassIn(String condition) {
        List<Long> conList = null;
        if(hasText(condition)){
            conList = Arrays.stream(condition.split(",")).map((con) -> Long.parseLong(con) ).collect(Collectors.toList());
        }
        return conList==null? null: feed.quest.id.in(conList);
    }
}
