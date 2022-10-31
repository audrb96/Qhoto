package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.*;
import com.qhoto.qhoto_api.domain.Exp;
import com.qhoto.qhoto_api.domain.Feed;
import com.qhoto.qhoto_api.domain.Quest;
import com.qhoto.qhoto_api.domain.QuestType;
import com.qhoto.qhoto_api.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestService {

    private final ActiveDailyRepository activeDailyRepository;
    private final ActiveMonthlyRepository activeMonthlyRepository;
    private final ActiveWeeklyRepository activeWeeklyRepository;
    private final FeedRepository feedRepository;

    private final UserRepository userRepository;

    private final ExpRepository expRepository;

    private final QuestTypeRepository questTypeRepository;
    public Map<String, Object> getQuestList(Long userId)  {
        List<Quest> dailyQuest = activeDailyRepository.findAllByIdAndStatus();
        List<Quest> weeklyQuest = activeWeeklyRepository.findAllByIdAndStatus();
        List<Quest> monthlyQuest = activeMonthlyRepository.findAllByIdAndStatus();
        Optional<Feed> dailyClear = feedRepository.findClearDailyQuest(userId);
        Optional<Feed> weeklyClear = feedRepository.findClearWeeklyQuest(userId);
        Optional<Feed> MonthlyClear = feedRepository.findClearMonthlyQuest(userId);
        Map<String, Object> questList = new HashMap<>();
        // dailyQuestList 반환
        if(dailyClear.isPresent()) {
            Feed today = dailyClear.get();
            questList.put("daily", buildQuestListWithClear(today));
        }else {
            questList.put("daily", buildQuestList(dailyQuest));
        }
        //weeklyQuestList 반환
        if(weeklyClear.isPresent()) {
            Feed weekly = weeklyClear.get();
            questList.put("weekly", buildQuestListWithClear(weekly));
        }else {
            questList.put("weekly", buildQuestList(weeklyQuest));
        }
        //MonthlyQuestList 반환
        if(MonthlyClear.isPresent()) {
            Feed monthly = MonthlyClear.get();
            questList.put("monthly", buildQuestListWithClear(monthly));
        }else {
            questList.put("monthly", buildQuestList(monthlyQuest));
        }

        return questList;
    }

    public IsClearRes getDailyIsClear(Long userId) {
//        TODO: 이부분,, 고민 필요..
        IsClearRes isClear = IsClearRes.builder()
                .isClear(feedRepository.findClearDailyQuest(userId)
                        .isPresent())
                .build();
        return isClear;
    }

    public IsClearRes getWeeklyIsClear(Long userId) {
        IsClearRes isClear = IsClearRes.builder()
                .isClear(feedRepository.findClearWeeklyQuest(userId).isPresent())
                .build();
        return isClear;
    }


    public IsClearRes getMonthlyIsClear(Long userId) {
        IsClearRes isClear = IsClearRes.builder()
                .isClear(feedRepository.findClearMonthlyQuest(userId).isPresent())
                .build();
        return isClear;
    }


    public List<QuestListItemRes> buildQuestListWithClear(Feed feed) {
            List<QuestListItemRes> questList = new ArrayList<>();
            questList.add(
                    QuestListItemRes.builder()
                            .questId(feed.getId())
                            .questName(feed.getQuest().getName())
                            .questType(feed.getTypeName())
                            .questScore(feed.getScore())
                            .questDifficulty(feed.getDifficulty())
                            .questImage(feed.getImage())
                            .build()
            );
            return questList;
    }

    public List<QuestListItemRes> buildQuestList(List<Quest> quests) {
        List<QuestListItemRes> questList = new ArrayList<>();
        for(Quest quest : quests){
            questList.add(
                    QuestListItemRes.builder()
                            .questId(quest.getId())
                            .questName(quest.getName())
                            .questType(quest.getQuestType().getName())
                            .questScore(quest.getScore())
                            .questDifficulty(quest.getDifficulty())
                            .questImage(null)
                            .build()
            );
        }
        return  questList;
    }

    public QuestLevelRes getQuestLevel(Long userId) {
        List<QuestType> questTypeList = questTypeRepository.findAll();
        Map<String, QuestPointRes> questPoint = new HashMap<>();
        List<QuestCountRes> questCounts = feedRepository.findAllQuestWithRollUp();
        List<QuestCountRes> allExp = expRepository.findPointByTypeCodeAndUserId(userId);
        for(QuestType qt : questTypeList) {
            Exp exp = expRepository.findAllByTypeCodeAndUserId(qt.getCode(), userId);
//            int totalCnt = feedRepository.findAllFeedByTypeCodeAndUserId(qt.getCode(), userId);

            QuestPointRes QP = QuestPointRes.builder()
                    .point(exp.getPoint())
                    .totalCnt()
                    .dailyCnt()
                    .weeklyCnt()
                    .monthlyCnt()
                    .build();
            questPoint.put(qt.getCode(), QP);
        }
       QuestLevelRes Q = QuestLevelRes.builder()
                                    .exp(questPoint)
                                    .build();
//        System.out.println(feedRepository.findAllFeedByTypeCodeAndUserId("H", userId));

        return Q;
    }
}
