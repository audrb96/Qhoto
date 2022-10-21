package com.qhoto.qhoto_api.domain;

import com.qhoto.qhoto_api.domain.type.FriendPK;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@IdClass(FriendPK.class)
public class Friend {

    @Id
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "follower",nullable = false)
    private User follower;

    @Id
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "followee", nullable = false)
    private User followee;

}
