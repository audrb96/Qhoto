package com.qhoto.qhoto_api.api.repository.user;

import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.domain.type.RequestStatus;
import com.qhoto.qhoto_api.dto.layer.IsFriendDto;
import com.qhoto.qhoto_api.dto.layer.QIsFriendDto;
import com.qhoto.qhoto_api.dto.request.ModifyUserReq;
import com.qhoto.qhoto_api.dto.response.user.ContactRes;
import com.qhoto.qhoto_api.dto.response.user.ContactResSet;
import com.qhoto.qhoto_api.dto.response.user.QContactRes;
import com.qhoto.qhoto_api.util.S3Utils;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentMap;
import java.util.stream.Collectors;

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
            String imageUrl = S3Utils.CLOUD_FRONT_DOMAIN_NAME +"/" + profileDir +"/"+ modifyUserReq.getFile().getOriginalFilename();
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
    public List<ContactRes> contactByCon(User userInfo, Map<String, String> contacts) {
        List<ContactRes> contactResList = jpaQueryFactory
                .select(new QContactRes(
                        user.id,
                        user.name,
                        user.nickname,
                        user.phone,
                        user.image,
                        user.expGrade,
                        JPAExpressions.select(new CaseBuilder()
                                .when(friendRequest.status.isNull())
                                .then("노관계")
                                .when(friendRequest.status.eq(RequestStatus.GET))
                                .then("내가요청")
                                .when(friendRequest.status.eq(RequestStatus.REQUEST))
                                .then("상대방요청")
                                .otherwise("노관계")
                        ).from(friendRequest)
                                .where(friendRequest.responseUser.eq(userInfo)
                                        .and(friendRequest.requestUser.eq(user))
                                        .and(friendRequest.status.ne(RequestStatus.FRIEND))
                                )
                ))
                .from(user)
                .where(
                        contactsIn(contacts), user.ne(userInfo),
                        friendRequestIsNotFriend(userInfo)
                )
                .fetch();

        contactResList.forEach((contactRes ->
            contactRes.setName(contacts.get(contactRes.getPhone()))
        ));


        return contactResList;

    }

    private BooleanExpression friendRequestIsNotFriend(User userInfo) {
        return user.notIn(
                JPAExpressions.select(friendRequest.responseUser).from(friendRequest).where(friendRequest.status.eq(RequestStatus.FRIEND).and(friendRequest.requestUser.eq(userInfo)))
        );
    }

    private BooleanExpression contactsIn(Map<String, String> contacts) {
        List<String> contactsList = new ArrayList<>(contacts.keySet());
        return user.phone.in(contactsList);
    }
}
