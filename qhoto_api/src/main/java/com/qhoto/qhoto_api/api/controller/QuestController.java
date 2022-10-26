package com.qhoto.qhoto_api.api.controller;

import com.qhoto.qhoto_api.api.service.QuestService;
import com.qhoto.qhoto_api.dto.response.QuestListRes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/quest")
public class QuestController {

    private final QuestService questService;

    @GetMapping("")
    public ResponseEntity<?> getQuestList() {
//        Long userId = jwt.getUserId(request);
//        Long userId;
//        try {
////            userId = jwtService.getUserId(request);
//        } catch (Exception e) {
//            userId = -1L;
//        }
        return new ResponseEntity<>(, HttpStatus.OK);
    }

    @GetMapping("/isClear/daily")
    public ResponseEntity<?> getDailyIsClear() {
        Long userId;

        return new ResponseEntity<>(questService.getDailyIsClear(), HttpStatus.OK);
    }

    @GetMapping("/isClear/weekly")
    public ResponseEntity<?> getWeeklyIsClear() {
        Long userId;

        return new ResponseEntity<>(questService.getWeeklyIsClear(), HttpStatus.OK);
    }

    @GetMapping("/isClear/monthly")
    public ResponseEntity<?> getMonthlyIsClear() {
        Long userId;
        return new ResponseEntity<>(questService.getMonthlyIsClear(), HttpStatus.OK);
    }


}
