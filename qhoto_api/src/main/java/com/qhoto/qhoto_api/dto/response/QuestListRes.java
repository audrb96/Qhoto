package com.qhoto.qhoto_api.dto.response;

import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestListRes {

    private Map<String, Object> attribute;

    public static class questList{
        private List<Quest> quests;
        public void addQuest(List<Quest> quest){
            this.quests = quest;
        }
    }

    @Setter
    public static class Quest{
        private Long questId;
        private String questName;
        private String questType;
        private int questScore;
        private int questDifficulty;
        public Quest(com.qhoto.qhoto_api.domain.Quest quest) {
            this.questId = quest.getId();
            this.questName = quest.getName();
            this.questType = quest.getQuestType().toString();
            this.questScore = quest.getScore();
            this.questDifficulty = quest.getDifficulty();
        }
    }

    @Setter
    public static class ClearQuest{
        private String questImage;
        private int questId;
    }

}
