package com.qhoto.qhoto_api.scheduler;

import com.qhoto.qhoto_api.api.repository.ActiveDailyRepository;
import com.qhoto.qhoto_api.api.repository.ActiveMonthlyRepository;
import com.qhoto.qhoto_api.api.repository.ActiveWeeklyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;

// 활성 퀘스트를 주기별로 바꿔주는 Scheduler
@Slf4j
@Component
@RequiredArgsConstructor
public class ActiveQuestScheduler {

    private final ActiveMonthlyRepository activeMonthlyRepository;
    private final ActiveWeeklyRepository activeWeeklyRepository;
    private final ActiveDailyRepository activeDailyRepository;



    @Scheduled(cron = "0 0 6 1 * ?",zone = "Asia/Seoul")
    @Transactional
    @Async
    public void setActiveMonthlyQuest() {
        log.info("monthlyQuest update");
        activeMonthlyRepository.updateMonthlyQuestDtoA(LocalDate.now(ZoneId.of("Asia/Seoul")));
        activeMonthlyRepository.updateMonthlyQuestAtoD(LocalDate.now(ZoneId.of("Asia/Seoul")).minusMonths(1));
    }

    @Scheduled(cron = "0 0 6 * * 1",zone = "Asia/Seoul")
    @Transactional
    @Async
    public void setActiveWeeklyQuest() {
        log.info("weeklyQuest update");
        activeWeeklyRepository.updateWeeklyQuestDtoA(LocalDate.now(ZoneId.of("Asia/Seoul")));
        activeWeeklyRepository.updateWeeklyQuestAtoD(LocalDate.now(ZoneId.of("Asia/Seoul")).minusWeeks(1));
    }

    @Scheduled(cron = "0 0 6 * * *",zone = "Asia/Seoul")
    @Transactional
    @Async
    public void setActiveDailyQuest() {
        log.info("dailyQuest update");
        activeDailyRepository.updateDailyQuestDtoA(LocalDate.now(ZoneId.of("Asia/Seoul")));
        activeDailyRepository.updateDailyQuestAtoD(LocalDate.now(ZoneId.of("Asia/Seoul")).minusDays(1));
    }






}
