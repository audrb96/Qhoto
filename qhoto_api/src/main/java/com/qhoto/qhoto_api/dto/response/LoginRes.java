package com.qhoto.qhoto_api.dto.response;

import com.qhoto.qhoto_api.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class LoginRes {

    private String accessToken;
    private String refreshToken;
    private Boolean isJoined;
}
