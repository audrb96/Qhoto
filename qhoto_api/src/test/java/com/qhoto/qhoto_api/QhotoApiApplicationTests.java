package com.qhoto.qhoto_api;

import com.qhoto.qhoto_api.api.repository.ActiveMonthlyRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

//@SpringBootTest
@Rollback(value = false)
class QhotoApiApplicationTests {

	@Autowired
	private ActiveMonthlyRepository activeMonthlyRepository;

//	@Test
//	@Transactional
//	void updateTest() {
//		activeMonthlyRepository.updateMonthlyQuestDtoA();
//		activeMonthlyRepository.updateMonthlyQuestAtoD();
//	}

}
