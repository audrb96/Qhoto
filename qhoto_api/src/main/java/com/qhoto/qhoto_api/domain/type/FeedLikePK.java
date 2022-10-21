package com.qhoto.qhoto_api.domain.type;

import com.qhoto.qhoto_api.domain.Feed;
import com.qhoto.qhoto_api.domain.User;
import lombok.Data;

import java.io.Serializable;

@Data
public class FeedLikePK implements Serializable {
    private Feed feed;
    private User user;
}
