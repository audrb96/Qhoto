package com.qhoto.qhoto_api.dto.response.quest;

import com.qhoto.qhoto_api.domain.type.FeedType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class QuestListItemRes {
    private Long activeId;
    private Long questId;
    private String questName;
    private String questType;
    private int questScore;
    private int questDifficulty;
    private String questImage;

    private FeedType feedType;

    @Builder
    public QuestListItemRes(Long activeId, Long questId, String questName, String questType, int questScore, int questDifficulty, String questImage, FeedType feedType) {
        this.activeId = activeId;
        this.questId = questId;
        this.questName = questName;
        this.questType = questType;
        this.questScore = questScore;
        this.questDifficulty = questDifficulty;
        this.questImage = questImage;
        this.feedType = feedType;
    }



}
