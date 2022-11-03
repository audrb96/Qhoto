package com.qhoto.qhoto_api.scheduler;

import com.qhoto.qhoto_api.api.repository.ActiveDailyRepository;
import com.qhoto.qhoto_api.api.repository.ActiveMonthlyRepository;
import com.qhoto.qhoto_api.api.repository.ActiveWeeklyRepository;
import com.qhoto.qhoto_api.domain.ActiveMonthly;
import com.qhoto.qhoto_api.domain.type.QuestStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ActiveQuestScheduler {

    private final ActiveMonthlyRepository activeMonthlyRepository;
    private final ActiveWeeklyRepository activeWeeklyRepository;
    private final ActiveDailyRepository activeDailyRepository;

    @Scheduled(cron = "0 0 6 1 * ?")
    public void activeMonthlyQuest() {
        Pageable page = PageRequest.of(0, 3);
        List<ActiveMonthly> ActiveMonthlyList = activeMonthlyRepository.findByStatusOrderByDateDesc("D", page);
        for (ActiveMonthly activeMonthly : ActiveMonthlyList) {
            activeMonthly.changeStatus(QuestStatus.A);
            activeMonthlyRepository.save(activeMonthly);
        }
    }

    @Scheduled(cron = "0 0 6 * * 1")
    public void setActiveWeeklyRepository() {

    }




}
