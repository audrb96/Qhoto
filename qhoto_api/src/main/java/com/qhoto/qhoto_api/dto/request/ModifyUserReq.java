package com.qhoto.qhoto_api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
public class ModifyUserReq {

    private String nickname;

    private String description;

    private String phone;

    private MultipartFile file;
}
