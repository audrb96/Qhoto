package com.qhoto.qhoto_api.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoRes {

    private String email;
    private String userName;
    private String nickname;
    private String image;
    private Boolean profileOpen;
    private int point;
    private String description;
    private String expGrade;
    private Integer totalExp;
}
