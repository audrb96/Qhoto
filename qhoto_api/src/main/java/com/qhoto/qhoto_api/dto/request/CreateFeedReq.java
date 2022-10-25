package com.qhoto.qhoto_api.dto.request;

import lombok.Getter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Getter
@ToString
public class CreateFeedReq {

    @NotNull
    private final Long userId;
    @NotNull
    private final Long questId;
    @NotNull
    private final MultipartFile feedImage;
    @NotNull
    private final String location;


    public CreateFeedReq(Long userId, Long questId, MultipartFile feedImage, String location) {
        this.userId = userId;
        this.questId = questId;
        this.feedImage = feedImage;
        this.location = location;
    }
}
