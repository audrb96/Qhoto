package com.qhoto.qhoto_api.domain.type;

import com.qhoto.qhoto_api.domain.User;
import lombok.Data;

import java.io.Serializable;

@Data
public class FriendPK implements Serializable {
    private User follower;
    private User followee;
}
