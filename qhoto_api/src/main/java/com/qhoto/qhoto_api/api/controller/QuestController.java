package com.qhoto.qhoto_api.api.controller;

import com.qhoto.qhoto_api.api.service.QuestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/quest")
public class QuestController {

    private final QuestService questService;

    @GetMapping("")
    public ResponseEntity<?> readAllQuestList() {
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
    public ResponseEntity<?> readDailyIsClear() {
        return new ResponseEntity<>(questService.getDailyIsClear(), HttpStatus.OK);
    }

    @GetMapping("/isClear/weekly")
    public ResponseEntity<?> readWeeklyIsClear() {
        return new ResponseEntity<>(questService.getWeeklyIsClear(), HttpStatus.OK);
    }

    @GetMapping("/isClear/monthly")
    public ResponseEntity<?> readMonthlyIsClear() {
        Long userId = 1L;
        return new ResponseEntity<>(questService.getMonthlyIsClear(), HttpStatus.OK);
    }


}
