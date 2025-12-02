package com.vamshi.statsservice.controller;

import com.vamshi.statsservice.dto.MatchScoreResponse;
import com.vamshi.statsservice.dto.PlayerStatsResponse;
import com.vamshi.statsservice.dto.BallEvent;
import com.vamshi.statsservice.model.MatchScoreEntity;
import com.vamshi.statsservice.model.PlayerStatsEntity;
import com.vamshi.statsservice.service.StatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    // 🏏 Match Score (Innings-based)
    @GetMapping("/matches/{matchId}/score")
    public ResponseEntity<MatchScoreResponse> getMatchScore(
            @PathVariable Long matchId,
            @RequestParam(defaultValue = "1") Integer innings) {

        return statsService.getMatchScore(matchId, innings)
                .map(this::toMatchScoreResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 👤 Player career stats (all matches)
    @GetMapping("/players/{playerId}")
    public List<PlayerStatsResponse> getPlayerStats(@PathVariable Long playerId) {
        List<PlayerStatsEntity> stats = statsService.getPlayerStats(playerId);
        return stats.stream().map(this::toPlayerStatsResponse).collect(Collectors.toList());
    }

    // 👤 Player stats for a specific match
    @GetMapping("/matches/{matchId}/players/{playerId}")
    public ResponseEntity<PlayerStatsResponse> getPlayerStatsForMatch(
            @PathVariable Long matchId,
            @PathVariable Long playerId) {

        return statsService.getPlayerStatsForMatch(matchId, playerId)
                .map(this::toPlayerStatsResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔥 NEW — Get all players’ stats for a match
    @GetMapping("/matches/{matchId}/players")
    public List<PlayerStatsResponse> getAllPlayersStatsForMatch(@PathVariable Long matchId) {
        return statsService.getAllPlayersStatsForMatch(matchId)
                .stream()
                .map(this::toPlayerStatsResponse)
                .collect(Collectors.toList());
    }

    // 🏏 Process ball event (from Scoring UI)
    @PostMapping("/ball")
    public ResponseEntity<Void> processBall(@RequestBody BallEvent event) {
        statsService.processBallEvent(event);
        return ResponseEntity.ok().build();
    }

    // 🔄 Entity → DTO mapping
    private MatchScoreResponse toMatchScoreResponse(MatchScoreEntity e) {
        MatchScoreResponse dto = new MatchScoreResponse();
        dto.setMatchId(e.getMatchId());
        dto.setInnings(e.getInnings());
        dto.setRuns(e.getRuns());
        dto.setWickets(e.getWickets());
        dto.setExtras(e.getExtras());
        dto.setOvers(formatOvers(e.getBalls()));
        return dto;
    }

    private PlayerStatsResponse toPlayerStatsResponse(PlayerStatsEntity e) {
        PlayerStatsResponse dto = new PlayerStatsResponse();
        dto.setMatchId(e.getMatchId());
        dto.setPlayerId(e.getPlayerId());
        dto.setRunsScored(e.getRunsScored());
        dto.setBallsFaced(e.getBallsFaced());
        dto.setFours(e.getFours());
        dto.setSixes(e.getSixes());
        dto.setOversBowled(formatOvers(e.getBallsBowled()));
        dto.setRunsConceded(e.getRunsConceded());
        dto.setWickets(e.getWickets());
        return dto;
    }

    private String formatOvers(int balls) {
        int overs = balls / 6;
        int remainingBalls = balls % 6;
        return overs + "." + remainingBalls;
    }
}
