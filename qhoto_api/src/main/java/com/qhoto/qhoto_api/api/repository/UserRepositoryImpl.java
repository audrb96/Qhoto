package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.request.ModifyUserReq;
import com.qhoto.qhoto_api.util.S3Utils;
import com.querydsl.jpa.impl.JPAUpdateClause;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.IOException;

import static com.qhoto.qhoto_api.domain.QUser.*;
import static org.springframework.util.StringUtils.*;

@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryByCon {

    private final S3Utils s3Utils;
    private final EntityManager em;

    //회원 정보 수정
    @Override
    @Transactional
    public void modifyUserByCon(ModifyUserReq modifyUserReq, User userInfo) throws IOException {
        //updateClause 생성
        JPAUpdateClause updateClause = new JPAUpdateClause(em, user);

        //닉네임 수정
        if(hasText(modifyUserReq.getNickname())) updateClause.set(user.nickname, modifyUserReq.getNickname());

        //자기소개 수정
        if(hasText(modifyUserReq.getDescription())) updateClause.set(user.description, modifyUserReq.getDescription());

        //사용자 프로필 이미지 수정
        if(modifyUserReq.getFile() != null) {
            String profileDir = "user/" + userInfo.getEmail();
            //S3에 사용
            s3Utils.upload(modifyUserReq.getFile(), profileDir);
            //DB에 저장할 이미지 URL
            String imageUrl = S3Utils.CLOUD_FRONT_DOMAIN_NAME + profileDir +"/"+ modifyUserReq.getFile().getOriginalFilename();
            updateClause.set(user.image, imageUrl);
        }

        //전화번호 수정
        if(hasText(modifyUserReq.getPhone())) updateClause.set(user.phone, modifyUserReq.getPhone());

        //프로필 Open 여부 수정
        if(modifyUserReq.getProfileOpen() != null) updateClause.set(user.profileOpen, modifyUserReq.getProfileOpen());

        //사용자 이름 수정
        if(hasText(modifyUserReq.getName())) updateClause.set(user.name, modifyUserReq.getName());

        //DB update 실행
        updateClause.where(user.id.eq(userInfo.getId())).execute();
    }
}
