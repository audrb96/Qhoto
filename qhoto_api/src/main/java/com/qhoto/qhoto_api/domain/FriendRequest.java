package com.qhoto.qhoto_api.domain;

import com.qhoto.qhoto_api.domain.type.RequestStatus;
import com.qhoto.qhoto_api.domain.type.converter.RequestStatusConverter;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.EnumType.*;
import static javax.persistence.FetchType.*;
import static javax.persistence.GenerationType.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class FriendRequest {
    @Id
    @Column(name = "friend_request_id")
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "request_user", nullable = false)
    private User requestUser;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "response_user", nullable = false)
    private User responseUser;

    @Convert(converter = RequestStatusConverter.class)
    @Column(name = "request_status",nullable = false)
    private RequestStatus status;

    @Column(name = "request_time",nullable = false)
    private LocalDateTime time;

    public void changeStatus(RequestStatus requestStatus) {
        this.status = requestStatus;
    }


}
