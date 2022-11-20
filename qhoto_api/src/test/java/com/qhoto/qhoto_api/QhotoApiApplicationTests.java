package com.qhoto.qhoto_api;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;


@SpringBootTest
@Rollback(value = false)
class QhotoApiApplicationTests {

//    @Autowired
//    private UserRepository userRepository;
//    @Test
//    @Transactional
//    void test() {
//        userRepository.contactByCon()
//    }
}
