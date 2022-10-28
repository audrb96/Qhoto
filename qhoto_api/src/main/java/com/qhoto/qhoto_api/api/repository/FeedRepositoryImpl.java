package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.type.QuestDuration;
import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.response.FeedAllRes;
import com.qhoto.qhoto_api.dto.response.QFeedAllRes;
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
    public List<FeedAllRes> findByCondition(FeedAllReq feedAllReq) {
        System.out.println(feedAllReq.getCondition());
        System.out.println(feedAllReq.getDuration());
        List<FeedAllRes> feedAllList = jpaQueryFactory
                .select(new QFeedAllRes(
                        feed.id,
                        feed.image))
                .from(feed)
                .where(feedClassIn(feedAllReq.getCondition()),
                        feedTypeEq(feedAllReq.getDuration()))
                .fetch();
        return feedAllList;


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
