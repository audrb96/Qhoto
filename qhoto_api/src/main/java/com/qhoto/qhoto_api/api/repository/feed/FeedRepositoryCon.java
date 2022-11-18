package com.qhoto.qhoto_api.api.repository.feed;

import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.response.feed.FeedAllDto;
import com.qhoto.qhoto_api.dto.response.feed.FeedFriendDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface FeedRepositoryCon {

    Page<FeedAllDto> findByCondition(User user, FeedAllReq feedAllReq, Pageable pageable);

    Page<FeedFriendDto> findByConditionAndUserId(FeedAllReq feedAllReq, Pageable pageable, Long userId);
}
