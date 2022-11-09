package com.qhoto.qhoto_api;

import com.qhoto.qhoto_api.api.repository.FeedRepository;
import com.qhoto.qhoto_api.api.repository.FeedRepositoryImpl;
import com.qhoto.qhoto_api.dto.request.FeedAllReq;
import com.qhoto.qhoto_api.dto.response.FeedFriendDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
        Page<FeedFriendDto> m = feedRepository.findByConditionAndUserId(new FeedAllReq("1,2,3", "M"), PageRequest.of(0, 5), 3L);
        m.forEach(System.out::println);

    }

}
