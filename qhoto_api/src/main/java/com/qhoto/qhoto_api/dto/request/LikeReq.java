package com.qhoto.qhoto_api.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@ToString
@NoArgsConstructor
public class LikeReq {

    @NotNull(message = "피드 아이디를 입력해주세요.")
    private Long feedId;

    public LikeReq(Long feedId) {
        this.feedId = feedId;
    }
}
