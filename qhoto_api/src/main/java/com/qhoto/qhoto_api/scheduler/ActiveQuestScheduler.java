//package com.qhoto.qhoto_api.scheduler;
//
//import com.qhoto.qhoto_api.api.repository.ActiveDailyRepository;
//import com.qhoto.qhoto_api.api.repository.ActiveMonthlyRepository;
//import com.qhoto.qhoto_api.api.repository.ActiveWeeklyRepository;
//import com.qhoto.qhoto_api.domain.ActiveMonthly;
//import com.qhoto.qhoto_api.domain.ActiveWeekly;
//import com.qhoto.qhoto_api.domain.type.QuestStatus;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//// 활성 퀘스트를 주기별로 바꿔주는 Scheduler
//@Component
//@RequiredArgsConstructor
//public class ActiveQuestScheduler {
//
//    private final ActiveMonthlyRepository activeMonthlyRepository;
//    private final ActiveWeeklyRepository activeWeeklyRepository;
//    private final ActiveDailyRepository activeDailyRepository;
//
//    @Scheduled(cron = "0 0 6 1 * ?")
//    @Transactional
//    public void setActiveMonthlyQuest() {
//        activeMonthlyRepository.updateMonthlyQuestDtoA();
//        activeMonthlyRepository.updateMonthlyQuestAtoD();
//    }
//
//    @Scheduled(cron = "0 0 6 * * 1")
//    @Transactional
//    public void setActiveWeeklyQuest() {
//        activeWeeklyRepository.updateMonthlyQuestDtoA();
//        activeWeeklyRepository.updateMonthlyQuestAtoD();
//    }
//
//    @Scheduled(cron = "0 0 6 * * *")
//    @Transactional
//    public void setActiveDailyQuest() {
//        activeDailyRepository.updateDailyQuestDtoA();
//        activeDailyRepository.updateDailyQuestAtoD();
//    }
//
//
//
//
//
//
//}
