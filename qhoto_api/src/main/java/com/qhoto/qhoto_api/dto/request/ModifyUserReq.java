package com.qhoto.qhoto_api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
public class ModifyUserReq {

    private String name;

    @Pattern(regexp = "^[a-zA-Z0-9._-]{2,}$", message = "닉네임 형식이 맞지 않습니다.")
    private String nickname;

    private String description;

    @Pattern(regexp = "^(01[01346-9])-?([1-9]{1}[0-9]{2,3})-?([0-9]{4})$", message = "전화번호 형식이 맞지 않습니다.")
    private String phone;

    private MultipartFile file;

    private Boolean profileOpen;
}
