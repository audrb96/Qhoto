package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.*;
import com.qhoto.qhoto_api.domain.Feed;
import com.qhoto.qhoto_api.domain.Quest;
import com.qhoto.qhoto_api.dto.response.QuestListItemRes;
import com.qhoto.qhoto_api.dto.response.isClearRes;
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


    public Map<String, Object> getQuestList()  {
        List<Quest> dailyQuest = activeDailyRepository.findAllByIdAndStatus();
        List<Quest> weeklyQuest = activeWeeklyRepository.findAllByIdAndStatus();
        List<Quest> monthlyQuest = activeMonthlyRepository.findAllByIdAndStatus();
        Optional<Feed> dailyClear = feedRepository.findClearDailyQuest(1L);
        Optional<Feed> weeklyClear = feedRepository.findClearWeeklyQuest(1L);
        Optional<Feed> MonthlyClear = feedRepository.findClearMonthlyQuest(1L);
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

    public isClearRes getDailyIsClear() {
//        TODO: 이부분,, 고민 필요..
        isClearRes isClear = isClearRes.builder()
                .isClear(feedRepository.findClearMonthlyQuest(1L)
                        .isPresent())
                .build();
        return isClear;
    }

    public isClearRes getWeeklyIsClear() {
        isClearRes isClear = isClearRes.builder()
                .isClear(feedRepository.findClearWeeklyQuest(1L).isPresent())
                .build();
        return isClear;
    }

    public isClearRes getMonthlyIsClear() {
        isClearRes isClear = isClearRes.builder()
                .isClear(feedRepository.findClearMonthlyQuest(1L).isPresent())
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

 }
