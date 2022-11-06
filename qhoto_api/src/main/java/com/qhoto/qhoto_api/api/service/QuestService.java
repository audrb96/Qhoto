package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.*;
import com.qhoto.qhoto_api.domain.Feed;
import com.qhoto.qhoto_api.domain.Quest;
import com.qhoto.qhoto_api.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestService {

    private final QuestRepository questRepository;
    private final FeedRepository feedRepository;

    private final UserRepository userRepository;
    private final ExpRepository expRepository;


    public Map<String, Object> getQuestList(Long userId)  {
        List<Quest> dailyQuest = questRepository.findAllDailyByIdAndStatus();
        List<Quest> weeklyQuest = questRepository.findAllWeeklyByIdAndStatus();
        List<Quest> monthlyQuest = questRepository.findAllMonthlyByIdAndStatus();
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
        IsClearRes isClear = IsClearRes.builder()
                .isClear(feedRepository.findClearDailyQuest(userId).isPresent())
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

    public QuestLevelRes getQuestLevel(Long userId) {
        // QusetLevelRes에 담아줄 Map 생성
        Map<String, QuestPointRes> questPoint = new HashMap<>();
        // 퀘스트 타입 별 point 집계
        List<QuestCountRes> allExp = expRepository.findPointByTypeCodeAndUserId(userId);
        // 퀘스트 typeCode / questDuration 별로 count 집계
        List<QuestAggregateRes> questCounts = feedRepository.findAllQuestWithRollUp(userId);
        int totalPoint = 0;
        int totalCnt = 0;
        int totalDaily = 0;
        int totalWeekly = 0;
        int totalMonthly = 0;
        // 퀘스트 type 별 QuestPoint 및 QuestCount 빌드
        for(QuestCountRes qc : allExp) {
            QuestPointRes QP = QuestPointRes.builder()
                            .point(qc.getSumPoint()).build();
            totalPoint += qc.getSumPoint();
            for(QuestAggregateRes qa : questCounts) {
                if(qc.getTypeCode().equals(qa.getCode())) {
                    if(qa.getDuration().equals("D")) {
                        QP.setDailyCnt(qa.getCount());
                        totalDaily += qa.getCount();
                    }else if(qa.getDuration().equals("W")) {
                        QP.setWeeklyCnt(qa.getCount());
                        totalWeekly += qa.getCount();
                    }else if(qa.getDuration().equals("M")) {
                        QP.setMonthlyCnt(qa.getCount());
                        totalMonthly += qa.getCount();
                    }else if(qa.getDuration().equals("ALL")){
                        QP.setTotalCnt(qa.getCount());
                        totalCnt += qa.getCount();
                    }
                }
            }
            questPoint.put(qc.getTypeCode(), QP);
        }
        // 전체 QuestPoint 및 QuestCount 빌드
        if(questPoint.size() != 0) {
            QuestPointRes QPR =  buildQuestPoint(totalPoint, totalCnt, totalDaily, totalWeekly, totalMonthly);
            questPoint.put("Total", QPR);
        }


        //QuestLevel 빌드
        QuestLevelRes Q = QuestLevelRes.builder()
                .exp(questPoint)
                .build();

        return Q;
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


    public QuestPointRes buildQuestPoint(int point, int cnt, int d, int w, int m) {
        QuestPointRes QP = QuestPointRes.builder()
                .point(point)
                .totalCnt(cnt)
                .dailyCnt(d)
                .weeklyCnt(w)
                .monthlyCnt(m)
                .build();

        return QP;
    }
//

}
