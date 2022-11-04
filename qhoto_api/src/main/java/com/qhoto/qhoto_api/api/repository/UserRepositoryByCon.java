package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.ModifyUserReq;

import java.io.IOException;

public interface UserRepositoryByCon {
    void modifyUserByCon(ModifyUserReq modifyUserReq, User user) throws IOException;
}
