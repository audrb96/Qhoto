package com.qhoto.qhoto_api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class QuestPointRes {

    private int En;
    private int Co;
    private int Sp;
    private int He;
    private int Qho;

}
