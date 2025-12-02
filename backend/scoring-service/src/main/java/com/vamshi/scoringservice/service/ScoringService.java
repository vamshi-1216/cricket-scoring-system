package com.vamshi.scoringservice.service;

import com.vamshi.scoringservice.dto.BallEvent;
import java.util.List;
import java.util.Map;

public interface ScoringService {

    BallEvent submitBall(BallEvent event);
    List<BallEvent> getEventsByMatch(Long matchId);
    Map<String, Object> getMatchSummary(Long matchId);
    Map<String, Object> endInnings(Long matchId);
    Map<String, Object> endMatch(Long matchId);  // 🆕 Added
}
