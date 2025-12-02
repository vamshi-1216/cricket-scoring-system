package com.vamshi.statsservice.service;

import com.vamshi.statsservice.dto.BallEvent;
import com.vamshi.statsservice.model.MatchScoreEntity;
import com.vamshi.statsservice.model.PlayerStatsEntity;

import java.util.List;
import java.util.Optional;

public interface StatsService {

    void processBallEvent(BallEvent event);

    Optional<MatchScoreEntity> getMatchScore(Long matchId, Integer innings);

    List<PlayerStatsEntity> getPlayerStats(Long playerId);

    Optional<PlayerStatsEntity> getPlayerStatsForMatch(Long matchId, Long playerId);

	List<PlayerStatsEntity> getAllPlayersStatsForMatch(Long matchId);
}
