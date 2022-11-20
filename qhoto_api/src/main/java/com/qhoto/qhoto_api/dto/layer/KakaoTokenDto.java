package com.qhoto.qhoto_api.dto.layer;

import lombok.Data;

import java.io.Serializable;

@Data
public class KakaoTokenDto implements Serializable {
    private String token_type;
    private String access_token;
    private Integer expires_in;
    private String refresh_token;
    private Integer refresh_token_expires_in;
    private String scope;
}
