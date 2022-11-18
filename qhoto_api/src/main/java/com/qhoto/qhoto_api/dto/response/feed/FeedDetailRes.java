package com.qhoto.qhoto_api.dto.response.feed;

import com.qhoto.qhoto_api.domain.type.FeedType;
import com.qhoto.qhoto_api.domain.type.QuestDuration;
import com.qhoto.qhoto_api.dto.type.LikeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class FeedDetailRes {

    private final Long feedId;
    private final Long userId;
    private final String userImage;
    private final String nickname;
    private final String feedImage;
    private final String feedTime;
    private final String questName;
    private final String questType;
    private final int questPoint;
    private final String expGrade;
    private final int expPoint;
    private final LikeStatus likeStatus;
    private final int likeCount;
    private final List<CommentRes> commentList;
    private final FeedType feedType;
    private final QuestDuration duration;


}
