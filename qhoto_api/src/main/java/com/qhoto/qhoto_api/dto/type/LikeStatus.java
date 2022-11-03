package com.qhoto.qhoto_api.dto.type;

import lombok.Getter;

@Getter
public enum LikeStatus {

    LIKE("좋아요"), UNLIKE("초기상태");

    private String value;

    LikeStatus(String value){
        this.value = value;
    }

}
