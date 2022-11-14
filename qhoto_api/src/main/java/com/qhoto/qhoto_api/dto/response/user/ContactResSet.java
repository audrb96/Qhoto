package com.qhoto.qhoto_api.dto.response.user;

import com.qhoto.qhoto_api.domain.type.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ContactResSet {
    private Long userId;
    private String name;
    private String nickname;
    private String phone;
    private String image;
    private String grade;
    private RequestStatus requestStatus;
}
