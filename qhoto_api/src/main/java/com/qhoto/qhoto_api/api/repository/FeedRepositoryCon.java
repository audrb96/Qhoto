package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.response.FeedAllDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface FeedRepositoryCon {

    Page<FeedAllDto> findByCondition(FeedAllReq feedAllReq, Pageable pageable);
}
