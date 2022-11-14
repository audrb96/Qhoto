package com.qhoto.qhoto_api.api.repository.user;

import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.ModifyUserReq;
import com.qhoto.qhoto_api.dto.response.user.ContactResSet;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface UserRepositoryByCon {
    void modifyUserByCon(ModifyUserReq modifyUserReq, User user) throws IOException;

    List<ContactResSet> contactByCon(User user, Map<String,String> contacts);
}
