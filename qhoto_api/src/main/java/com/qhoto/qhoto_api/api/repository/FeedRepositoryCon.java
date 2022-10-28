package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.dto.response.FeedAllRes;

public interface FeedRepositoryCon {

    FeedAllRes findByCondition(String condition);
}
