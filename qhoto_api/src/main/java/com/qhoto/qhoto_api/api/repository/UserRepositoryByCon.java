package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.ModifyUserReq;
import com.qhoto.qhoto_api.dto.response.ContactRes;

import java.io.IOException;
import java.util.Map;

public interface UserRepositoryByCon {
    void modifyUserByCon(ModifyUserReq modifyUserReq, User user) throws IOException;

    ContactRes contactByCon(Map<String,String> contacts);
}
