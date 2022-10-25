package com.qhoto.qhoto_api.api.service;

import com.qhoto.qhoto_api.api.repository.*;
import com.qhoto.qhoto_api.domain.Quest;
import com.qhoto.qhoto_api.dto.response.QuestListRes;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestService {

    private final ActiveDailyRepository activeDailyRepository;

    private final ActiveMonthlyRepository activeMonthlyRepository;

    private final ActiveWeeklyRepository activeWeeklyRepository;

    private final FeedRepository feedRepository;

    private final UserRepository userRepository;


    @Transactional
    public List<QuestListRes> getQuestList()  {
        List<Quest> dailyQuest = activeDailyRepository.findAllByIdAndStatus();
        List<Quest> weeklyQuest = activeWeeklyRepository.findAllByIdAndStatus();
        List<Quest> monthlyQuest = activeWeeklyRepository.findAllByIdAndStatus();

        Map<String, Object> daily = new HashMap<>();
        Map<String, Object> weekly = new HashMap<>();
        Map<String, Object> monthly = new HashMap<>();

        QuestListRes.questList questList = new QuestListRes.questList();
        // 이렇게 넣는게 나은건지 아니면 그냥 어차피 껏해야 3개니까 for문 돌리는게 나을지 고민.
        questList.addQuest(dailyQuest.stream().map(QuestListRes.Quest::new).collect(Collectors.toList()));
        feedRepository.findWithPagingByUserIdAndStatus(1L, (Pageable) PageRequest.of(0, 1));

        QuestListRes questListRes = new QuestListRes();
        questListRes.getAttribute().put("daily", )

        return
    }

    public static Boolean getDailyIsClear() {
//        TODO: 이부분,, 고민 필요..
//        Boolean isClear = feedRepository.findWithPagingByUserIdAndStatus(1L, PageRequest.of(0, 1))
//                .size() == 1 ? true : false;
        return isClear;
    }

    public static Boolean getWeeklyIsClear() {

    }

    public static Boolean getMonthlyIsClear() {

    }

}
