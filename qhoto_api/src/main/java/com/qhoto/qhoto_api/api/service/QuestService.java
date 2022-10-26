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
    public Map<String, Object> getQuestList()  {
        List<Quest> dailyQuest = activeDailyRepository.findAllByIdAndStatus();
        List<Quest> weeklyQuest = activeWeeklyRepository.findAllByIdAndStatus();
        List<Quest> monthlyQuest = activeWeeklyRepository.findAllByIdAndStatus();
//    Todo: api docs 수정함. 다시.
        Map<String, Object> questList = new HashMap<>();

        feedRepository.findWithPagingByUserIdAndStatus(1L, (Pageable) PageRequest.of(0, 1));

        QuestListRes questListRes = new QuestListRes();


        return questList;
    }

    public Boolean getDailyIsClear() {
//        TODO: 이부분,, 고민 필요..
        Boolean isClear = feedRepository.findWithPagingByUserIdAndStatus(1L, (Pageable) PageRequest.of(0, 1))
                .isPresent();
        return isClear;
    }

    public Boolean getWeeklyIsClear() {

    }

    public Boolean getMonthlyIsClear() {

    }

}
