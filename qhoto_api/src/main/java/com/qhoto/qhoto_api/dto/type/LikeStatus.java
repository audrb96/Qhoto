package com.qhoto.qhoto_api.dto.type;

import lombok.Getter;

@Getter
public enum LikeStatus {

    LIKE("LIKE"), UNLIKE("UNLIKE");

    private String value;

    LikeStatus(String value){
        this.value = value;
    }

}
