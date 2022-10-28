package com.qhoto.qhoto_api.api.controller;

import com.qhoto.qhoto_api.api.service.QuestService;
import com.qhoto.qhoto_api.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/quest")
public class QuestController {

    private final QuestService questService;

    @GetMapping("")
    public ResponseEntity<?> readAllQuestList(@AuthenticationPrincipal User user) {

//        Long userId = jwt.getUserId(request);
//        Long userId;
//        try {
////            userId = jwtService.getUserId(request);
//        } catch (Exception e) {
//            userId = -1L;
//        }

        return new ResponseEntity<>(questService.getQuestList(), HttpStatus.OK);
    }

    @GetMapping("/isClear/daily")
    public ResponseEntity<?> readDailyIsClear(@AuthenticationPrincipal User user) {
        Long userId = 1L;
        System.out.println(user.getId());
        return new ResponseEntity<>(questService.getDailyIsClear(), HttpStatus.OK);
    }

    @GetMapping("/isClear/weekly")
    public ResponseEntity<?> readWeeklyIsClear(@AuthenticationPrincipal User user) {
        Long userId = 1L;
        return new ResponseEntity<>(questService.getWeeklyIsClear(), HttpStatus.OK);
    }

    @GetMapping("/isClear/monthly")
    public ResponseEntity<?> readMonthlyIsClear(@AuthenticationPrincipal User user) {
        Long userId = 1L;
        return new ResponseEntity<>(questService.getMonthlyIsClear(), HttpStatus.OK);
    }


}
