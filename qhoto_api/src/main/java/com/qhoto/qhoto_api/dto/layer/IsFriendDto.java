package com.qhoto.qhoto_api.dto.layer;

import com.qhoto.qhoto_api.domain.type.RequestStatus;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;

@Data
public class IsFriendDto {
    private final Long userId;
    private RequestStatus requestStatus;

    @Builder
    @QueryProjection
    public IsFriendDto(Long userId, RequestStatus requestStatus) {
        this.userId = userId;
        this.requestStatus = requestStatus;
    }
}
