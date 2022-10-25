package com.qhoto.qhoto_api.dto.response;

import com.qhoto.qhoto_api.domain.Feed;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClearQuestRes {
    private Long questId;
    private String questImage;

    public static ClearQuestRes createDto(Feed feed) {
        return ClearQuestRes.builder().questId(feed.getId()).
                questImage(feed.getImage()).build();
    }

}
