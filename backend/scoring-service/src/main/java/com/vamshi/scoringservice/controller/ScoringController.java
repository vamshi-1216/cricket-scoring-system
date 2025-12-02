package com.vamshi.scoringservice.controller;

import com.vamshi.scoringservice.dto.BallEvent;
import com.vamshi.scoringservice.service.ScoringService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/scoring")
public class ScoringController {

    private final ScoringService scoringService;

    public ScoringController(ScoringService scoringService) {
        this.scoringService = scoringService;
    }

    @PostMapping("/ball")
    public ResponseEntity<BallEvent> submitBall(@RequestBody BallEvent ballEvent) {
        return ResponseEntity.ok(scoringService.submitBall(ballEvent));
    }

    @GetMapping("/match/{matchId}/events")
    public ResponseEntity<List<BallEvent>> getMatchEvents(@PathVariable Long matchId) {
        return ResponseEntity.ok(scoringService.getEventsByMatch(matchId));
    }

    @GetMapping("/match/{matchId}/summary")
    public ResponseEntity<Map<String, Object>> getMatchSummary(@PathVariable Long matchId) {
        return ResponseEntity.ok(scoringService.getMatchSummary(matchId));
    }
    @PostMapping("/end-innings/{matchId}")
    public ResponseEntity<?> endInnings(@PathVariable Long matchId) {
        return ResponseEntity.ok(scoringService.endInnings(matchId));
    }

}
