package com.qhoto.qhoto_api.dto.response;

import com.qhoto.qhoto_api.domain.AuthProvider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyInfoRes {
    private AuthProvider authProvider;
    private Boolean contactAgree;
    private LocalDate contactAgreeDate;
    private String email;
    private String UserImage;
    private LocalDate JoinDate;
    private String name;
    private String nickname;
    private String phone;
    private Boolean profileOpen;
    private String description;
    private String expGrade;
    private Integer totalExp;
}
