package com.qhoto.qhoto_api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
public class ModifyUserReq {

    private String nickname;

    private String description;

    @Pattern(regexp = "/^\\d{3}-\\d{3,4}-\\d{4}$/", message = "전화번호 형식이 아닙니다.")
    private String phone;

    private MultipartFile file;
}
