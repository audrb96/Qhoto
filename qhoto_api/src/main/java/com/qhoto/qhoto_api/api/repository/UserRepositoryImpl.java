package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.ModifyUserReq;
import com.qhoto.qhoto_api.util.S3Utils;
import com.querydsl.jpa.impl.JPAUpdateClause;
import lombok.RequiredArgsConstructor;
import javax.persistence.EntityManager;
import java.io.IOException;

import static com.qhoto.qhoto_api.domain.QUser.*;
import static org.springframework.util.StringUtils.*;

@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryByCon {

    private final S3Utils s3Utils;
    private final EntityManager em;

    @Override
    public void modifyUserByCon(ModifyUserReq modifyUserReq, User userInfo) throws IOException {
        JPAUpdateClause updateClause = new JPAUpdateClause(em, user);
        if(hasText(modifyUserReq.getNickname())) updateClause.set(user.nickname, modifyUserReq.getNickname());
        if(hasText(modifyUserReq.getDescription())) updateClause.set(user.description, modifyUserReq.getDescription());
        if(modifyUserReq.getFile() != null) {
            String profileDir = "/user/" + userInfo.getEmail();
            s3Utils.upload(modifyUserReq.getFile(), profileDir);
            String imageUrl = S3Utils.CLOUD_FRONT_DOMAIN_NAME + profileDir +"/"+ modifyUserReq.getFile().getOriginalFilename();
            updateClause.set(user.image, imageUrl);
        }
        if(hasText(modifyUserReq.getPhone())) updateClause.set(user.phone, modifyUserReq.getPhone());

        updateClause.where(user.id.eq(userInfo.getId())).execute();
    }
}
