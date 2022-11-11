package com.qhoto.qhoto_api;

import com.qhoto.qhoto_api.api.repository.ActiveDailyRepository;
import com.qhoto.qhoto_api.api.repository.ActiveMonthlyRepository;
import com.qhoto.qhoto_api.api.repository.ActiveWeeklyRepository;
import com.qhoto.qhoto_api.api.repository.FeedRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.CronTask;
import org.springframework.scheduling.config.IntervalTask;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.scheduling.support.ScheduledMethodRunnable;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;


//@SpringBootTest
//@Rollback(value = false)
class QhotoApiApplicationTests {

}
