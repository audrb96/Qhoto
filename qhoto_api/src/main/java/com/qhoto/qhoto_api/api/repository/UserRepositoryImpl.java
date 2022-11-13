package com.qhoto.qhoto_api.api.repository;

import com.qhoto.qhoto_api.domain.QFriendRequest;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.domain.type.RequestStatus;
import com.qhoto.qhoto_api.dto.layer.IsFriendDto;
import com.qhoto.qhoto_api.dto.layer.QIsFriendDto;
import com.qhoto.qhoto_api.dto.request.ModifyUserReq;
import com.qhoto.qhoto_api.dto.response.ContactRes;
import com.qhoto.qhoto_api.dto.response.QContactRes;
import com.qhoto.qhoto_api.util.S3Utils;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.qhoto.qhoto_api.domain.QFriendRequest.*;
import static com.qhoto.qhoto_api.domain.QUser.user;
import static org.springframework.util.StringUtils.hasText;

@RequiredArgsConstructor
@Slf4j
public class UserRepositoryImpl implements UserRepositoryByCon {

    private final S3Utils s3Utils;
    private final EntityManager em;
    private final JPAQueryFactory jpaQueryFactory;

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

    @Override
    public ContactRes contactByCon(User userInfo,Map<String, String> contacts) {
        List<ContactRes> contactResList = jpaQueryFactory
                .select(new QContactRes(
                        user.id,
                        user.name,
                        user.nickname,
                        user.phone,
                        user.image,
                        user.expGrade
                ))
                .from(user)
                .where(contactsIn(contacts), user.ne(userInfo))
                .fetch();

        contactResList.forEach(contactRes ->
            contactRes.setName(contacts.get(contactRes.getPhone())));

        List<IsFriendDto> isFriendDtoList = jpaQueryFactory
                .select(new QIsFriendDto(
                    user.id,friendRequest.status
                )).from(user, friendRequest)
                .where( user.id.eq(friendRequest.requestUser.id),
                        friendRequest.responseUser.eq(userInfo).or(friendRequest.requestUser.eq(userInfo)),
                        friendRequest.status.ne(RequestStatus.FRIEND))
                .fetch();
        log.info("contactResList = {}", contactResList);
        log.info("isFriendDtoList ={}", isFriendDtoList);
        return null;
    }

    private BooleanExpression contactsIn(Map<String, String> contacts) {
        List<String> contactsList = new ArrayList<>(contacts.keySet());
        return user.phone.in(contactsList);
    }
}
