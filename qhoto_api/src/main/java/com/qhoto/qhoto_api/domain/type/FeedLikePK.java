package com.qhoto.qhoto_api.domain.type;

import com.qhoto.qhoto_api.domain.Feed;
import com.qhoto.qhoto_api.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeedLikePK implements Serializable {
    private Feed feed;
    private User user;

}
