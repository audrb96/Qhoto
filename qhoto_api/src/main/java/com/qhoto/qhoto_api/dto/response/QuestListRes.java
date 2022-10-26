package com.qhoto.qhoto_api.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class QuestListRes {

    private Long questId;
    private String questName;
    private String questType;
    private int questScore;
    private int questDifficulty;
    private String questImage;


    @Builder
    public QuestListRes(Long questId, String questName, String questType, int questScore, int questDifficulty, String questImage) {
        this.questId = questId;
        this.questName = questName;
        this.questType = questType.toString();
        this.questScore = questScore;
        this.questDifficulty = questDifficulty;
        this.questImage = questImage;
    }

}
