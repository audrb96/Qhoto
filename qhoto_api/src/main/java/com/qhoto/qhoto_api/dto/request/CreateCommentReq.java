package com.qhoto.qhoto_api.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@ToString
@NoArgsConstructor
public class CreateCommentReq {

    @NotNull(message = "피드 아이디를 입력해주세요.")
    private Long feedId;

    @NotNull(message = "댓글을 입력해주세요.")
    private String commentContext;


    public CreateCommentReq(Long feedId, String commentContext) {
        this.feedId = feedId;
        this.commentContext = commentContext;
    }
}
