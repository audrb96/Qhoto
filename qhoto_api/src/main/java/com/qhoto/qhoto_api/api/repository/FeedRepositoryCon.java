package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.response.FeedAllRes;

import java.util.List;

public interface FeedRepositoryCon {

    List<FeedAllRes> findByCondition(FeedAllReq feedAllReq);
}
