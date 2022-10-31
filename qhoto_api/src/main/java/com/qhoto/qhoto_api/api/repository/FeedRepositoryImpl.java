package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.type.QuestDuration;
import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.response.FeedAllDto;
import com.qhoto.qhoto_api.dto.response.QFeedAllDto;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

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
    public Page<FeedAllDto> findByCondition(FeedAllReq feedAllReq, Pageable pageable) {
        List<FeedAllDto> feedList = jpaQueryFactory
                .select(new QFeedAllDto(
                        feed.id,
                        feed.image
                        ))
                .from(feed)
                .where(feedClassIn(feedAllReq.getCondition(),feedAllReq.getDuration()),
                        feedTypeEq(feedAllReq.getDuration())
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        JPAQuery<FeedAllDto> countQuery = jpaQueryFactory
                .select(Projections.constructor(FeedAllDto.class,
                        feed.id,
                        feed.image
                        ))
                .from(feed)
                .where(feedClassIn(feedAllReq.getCondition(),feedAllReq.getDuration()),
                        feedTypeEq(feedAllReq.getDuration())
                );

        return PageableExecutionUtils.getPage(feedList, pageable, countQuery::fetchCount);
    }
    private BooleanExpression feedTypeEq(String duration) {
        QuestDuration qd = null;

        if(duration.equals("D")) qd = QuestDuration.D;
        else if(duration.equals("W")) qd = QuestDuration.W;
        else if(duration.equals("M")) qd = QuestDuration.M;

        return hasText(duration)? feed.duration.eq(qd):null;
    }

    private BooleanExpression feedClassIn(String condition, String duration) {
        List<Long> conList = null;
        if(hasText(condition)){
            conList = Arrays.stream(condition.split(",")).map((con) -> Long.parseLong(con) ).collect(Collectors.toList());
        }
        if(duration.equals("D")){
            return conList==null? null: feed.activeDaily.id.in(conList);
        } else if (duration.equals("W")) {
            return conList==null? null: feed.activeWeekly.id.in(conList);
        }
        return conList==null? null: feed.activeMonthly.id.in(conList);
    }
}
