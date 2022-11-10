package com.qhoto.qhoto_api;

import com.qhoto.qhoto_api.api.repository.FeedRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;


@SpringBootTest
@Rollback(value = false)
class QhotoApiApplicationTests {

	@Autowired
	private FeedRepository feedRepository;

	@Test
	@Transactional
	void updateTest() {
        feedRepository.deleteFeedByfeedId(42L);
    }

}
