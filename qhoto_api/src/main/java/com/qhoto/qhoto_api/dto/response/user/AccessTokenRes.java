package com.qhoto.qhoto_api.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccessTokenRes {
    String accessToken;
    String refreshToken;
}
