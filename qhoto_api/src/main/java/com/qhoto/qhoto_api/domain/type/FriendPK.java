package com.qhoto.qhoto_api.domain.type;

import com.qhoto.qhoto_api.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FriendPK implements Serializable {
    private Long follower;
    private Long followee;
}
