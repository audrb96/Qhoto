package com.qhoto.qhoto_api.dto.request;

import com.qhoto.qhoto_api.domain.type.CommentStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@ToString
public class CreateCommentReq {

    @NotNull
    private final Long feedId;

    @NotNull
    private final Long userId;

    @NotNull
    private final String commentContext;


    @Builder
    public CreateCommentReq(Long feedId, Long userId, String commentContext) {
        this.feedId = feedId;
        this.userId = userId;
        this.commentContext = commentContext;
    }
}
