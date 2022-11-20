package com.qhoto.qhoto_api.api.controller;

import com.qhoto.qhoto_api.api.service.QuestService;
import com.qhoto.qhoto_api.domain.User;
import com.qhoto.qhoto_api.dto.response.quest.IsClearRes;
import com.qhoto.qhoto_api.dto.response.quest.QuestLevelRes;
import com.qhoto.qhoto_api.dto.response.quest.QuestList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 퀘스트 api
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quest")
public class QuestController {

    private final QuestService questService;

    /**
     * 모든 퀘스트 리스트 불러오기 api
     * @param user
     * @return {@link QuestList }
     */
    @GetMapping("")
    public ResponseEntity<QuestList> readAllQuestList(@AuthenticationPrincipal User user) {
        Long userId = user.getId();
        return new ResponseEntity<>(questService.getQuestList(userId), HttpStatus.OK);
    }

    /**
     * 데일리 퀘스트를 clear 했는지 확인 api
     * @param user
     * @return {@link IsClearRes}
     */
    @GetMapping("/isClear/daily")
    public ResponseEntity<IsClearRes> readDailyIsClear(@AuthenticationPrincipal User user) {
        Long userId = user.getId();
        return new ResponseEntity<>(questService.getDailyIsClear(userId), HttpStatus.OK);
    }

    /**
     * 위클리 퀘스트를 clear 했는지 확인 api
     * @param user
     * @return {@link IsClearRes}
     */
    @GetMapping("/isClear/weekly")
    public ResponseEntity<IsClearRes> readWeeklyIsClear(@AuthenticationPrincipal User user) {
        Long userId = user.getId();
        return new ResponseEntity<>(questService.getWeeklyIsClear(userId), HttpStatus.OK);
    }

    /**
     * 먼슬리 퀘스트를 clear 했는지 확인 api
     * @param user
     * @return {@link IsClearRes}
     */
    @GetMapping("/isClear/monthly")
    public ResponseEntity<IsClearRes> readMonthlyIsClear(@AuthenticationPrincipal User user) {
        Long userId = user.getId();
        return new ResponseEntity<>(questService.getMonthlyIsClear(userId), HttpStatus.OK);
    }

    /**
     * 나의 퀘스트 포인트 정보를 확인
     * @param user
     * @return {@link QuestLevelRes}
     */
    @GetMapping("/point")
    public ResponseEntity<QuestLevelRes> readQuestLevel(@AuthenticationPrincipal User user) {
        Long userId = user.getId();
        return new ResponseEntity<>(questService.getQuestLevel(userId), HttpStatus.OK);
    }

    /**
     * 친구의 퀘스트 포인트 정보를 확인
     * 추후 리팩토링 가능하다면 리팩토링 하면 좋을 듯 하다.
     * @param userId
     * @return {@link QuestLevelRes}
     */
    @GetMapping("/point/{userId}")
    public ResponseEntity<QuestLevelRes> readFriendQuestLevel(@PathVariable Long userId) {
        return new ResponseEntity<>(questService.getQuestLevel(userId), HttpStatus.OK);
    }
}
