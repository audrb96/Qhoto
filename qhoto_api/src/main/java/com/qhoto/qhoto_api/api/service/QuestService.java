package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.ExpRepository;
import com.qhoto.qhoto_api.api.repository.FeedRepository;
import com.qhoto.qhoto_api.api.repository.QuestRepository;
import com.qhoto.qhoto_api.domain.Feed;
import com.qhoto.qhoto_api.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestService {

    private final QuestRepository questRepository;
    private final FeedRepository feedRepository;
    private final ExpRepository expRepository;

    /**
     * 전체 활성화된 퀘스트 불러오기
     * @param userId
     * @return {@link QuestList}
     */
    public QuestList getQuestList(Long userId){

        // 오늘 활성화된 퀘스트들 조회
        List<ActiveQuestRes> dailyQuest = questRepository.findAllDailyByIdAndStatus();
        List<ActiveQuestRes> weeklyQuest = questRepository.findAllWeeklyByIdAndStatus();
        List<ActiveQuestRes> monthlyQuest = questRepository.findAllMonthlyByIdAndStatus();

        // user가 데일리/위클리/먼슬리 퀘스트 클리어 여부 조회
        Optional<Feed> dailyClear = feedRepository.findClearDailyQuest(userId);
        Optional<Feed> weeklyClear = feedRepository.findClearWeeklyQuest(userId);
        Optional<Feed> MonthlyClear = feedRepository.findClearMonthlyQuest(userId);

        // 반환해줄 퀘스트 리스트 생성
        Map<String, Object> questList = new HashMap<>();

        // dailyQuestList 반환
        if(dailyClear.isPresent()) {
            Feed today = dailyClear.get();
            Long activeId = today.getActiveDaily().getId();
            questList.put("daily", buildQuestListWithClear(today, activeId));
        }else {
            questList.put("daily", buildQuestList(dailyQuest));
        }

        //weeklyQuestList 반환
        if(weeklyClear.isPresent()) {
            Feed weekly = weeklyClear.get();
            Long activeId = weekly.getActiveWeekly().getId();
            questList.put("weekly", buildQuestListWithClear(weekly, activeId));
        }else {
            questList.put("weekly", buildQuestList(weeklyQuest));
        }

        //MonthlyQuestList 반환
        if(MonthlyClear.isPresent()) {
            Feed monthly = MonthlyClear.get();
            Long activeId = monthly.getActiveMonthly().getId();
            questList.put("monthly", buildQuestListWithClear(monthly, activeId));
        }else {
            questList.put("monthly", buildQuestList(monthlyQuest));
        }

        QuestList QL = QuestList.builder().questList(questList).build();
        return QL;
    }

    /**
     * 데일리 퀘스트 클리어 여부 조회
     * @param userId
     * @return {@link IsClearRes}
     */
    public IsClearRes getDailyIsClear(Long userId) {
        IsClearRes isClear = IsClearRes.builder()
                .isClear(feedRepository.findClearDailyQuest(userId).isPresent())
                .build();
        return isClear;
    }

    /**
     * 위클리 퀘스트 클리어 여부 조회
     * @param userId
     * @return {@link IsClearRes}
     */
    public IsClearRes getWeeklyIsClear(Long userId) {
        IsClearRes isClear = IsClearRes.builder()
                .isClear(feedRepository.findClearWeeklyQuest(userId).isPresent())
                .build();
        return isClear;
    }

    /**
     * 먼슬리 퀘스트 클리어 여부 조회
     * @param userId
     * @return {@link IsClearRes}
     */
    public IsClearRes getMonthlyIsClear(Long userId) {
        IsClearRes isClear = IsClearRes.builder()
                .isClear(feedRepository.findClearMonthlyQuest(userId).isPresent())
                .build();
        return isClear;
    }


    /**
     * 사용자별 점수 및 클리어한 퀘스트 갯수 조회
     * @param userId
     * @return {@link QuestLevelRes}
     */
    public QuestLevelRes getQuestLevel(Long userId) {
        // QusetLevelRes에 담아줄 Map 생성
        Map<String, QuestPointRes> questPoint = new HashMap<>();

        // 퀘스트 타입 별 point 집계
        List<QuestCountRes> allExp = expRepository.findPointByTypeCodeAndUserId(userId);

        // 퀘스트 typeCode / questDuration 별로 count 집계
        List<QuestAggregateRes> questCounts = feedRepository.findAllQuestWithRollUp(userId);

        // 전체 갯수를 세 주기 위한 변수 선언
        int totalPoint = 0;
        int totalCnt = 0;
        int totalDaily = 0;
        int totalWeekly = 0;
        int totalMonthly = 0;

        // 퀘스트 type 별 QuestPoint 및 QuestCount 빌드
        for(QuestCountRes qc : allExp) {

            // allExp의 타입별 point를 먼저 담고
            QuestPointRes QP = QuestPointRes.builder()
                            .point(qc.getSumPoint()).build();

            // 전체 포인트를 함께 담아주기 위해 totalPoint에 더해준다.
            totalPoint += qc.getSumPoint();

            // QP에 questCounts(갯수)를 각각 for문을 돌면서 담아준다.
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
        QuestPointRes QPR =  buildQuestPoint(totalPoint, totalCnt, totalDaily, totalWeekly, totalMonthly);
        questPoint.put("Total", QPR);


        //QuestLevel 빌드
        QuestLevelRes Q = QuestLevelRes.builder()
                .exp(questPoint)
                .build();

        return Q;
    }

    // 클리어한 퀘스트가 있는 경우 퀘스트 리스트 빌드
    public List<QuestListItemRes> buildQuestListWithClear(Feed feed, Long activeId) {
            List<QuestListItemRes> questList = new ArrayList<>();
            questList.add(
                    QuestListItemRes.builder()
                            .activeId(activeId)
                            .questId(feed.getId())
                            .questName(feed.getQuest().getName())
                            .questType(feed.getTypeCode())
                            .questScore(feed.getScore())
                            .questDifficulty(feed.getDifficulty())
                            .questImage(feed.getImage())
                            .feedType(feed.getFeedType())
                            .build()

            );
            return questList;
    }

    // 클리어한 퀘스트가 없는 경우 퀘스트 리스트 빌드
    public List<QuestListItemRes> buildQuestList(List<ActiveQuestRes> quests) {
        return  quests.stream().map((quest) -> QuestListItemRes.builder()
                .activeId(quest.getActiveId())
                .questId(quest.getQuestId())
                .questName(quest.getQuestName())
                .questType(quest.getCode())
                .questScore(quest.getScore())
                .questDifficulty(quest.getDifficulty())
                .build()).collect(Collectors.toList());
    }

    // 퀘스트 포인트 빌드
    public QuestPointRes buildQuestPoint(int point, int cnt, int d, int w, int m) {
        return QuestPointRes.builder()
               .point(point)
               .totalCnt(cnt)
               .dailyCnt(d)
               .weeklyCnt(w)
               .monthlyCnt(m)
               .build();
    }

}
