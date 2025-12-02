package com.vamshi.scoringservice.service.impl;

import com.vamshi.scoringservice.dto.BallEvent;
import com.vamshi.scoringservice.model.BallEventEntity;
import com.vamshi.scoringservice.repository.BallEventRepository;
import com.vamshi.scoringservice.service.ScoringService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.*;

@Service
public class ScoringServiceImpl implements ScoringService {

    private final BallEventRepository repository;
    private final RestTemplate restTemplate = new RestTemplate();

    public ScoringServiceImpl(BallEventRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public BallEvent submitBall(BallEvent event) {
        if (event.getMatchId() == null) {
            throw new IllegalArgumentException("Match ID is required");
        }

        event.setEventId(UUID.randomUUID().toString());
        event.setTimestamp(Instant.now());

        BallEventEntity entity = toEntity(event);
        repository.save(entity);

        return event;
    }

    @Override
    public List<BallEvent> getEventsByMatch(Long matchId) {
        return repository.findByMatchIdOrderByInningsAscOverAscBallInOverAsc(matchId)
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public Map<String, Object> getMatchSummary(Long matchId) {
        List<BallEventEntity> balls = repository.findByMatchId(matchId);

        int totalRuns = balls.stream().mapToInt(BallEventEntity::getTotalRunsThisBall).sum();
        long wickets = balls.stream().filter(BallEventEntity::isWicket).count();
        int totalBalls = balls.size();

        String overs = totalBalls / 6 + "." + totalBalls % 6;

        return Map.of(
                "runs", totalRuns,
                "wickets", wickets,
                "overs", overs,
                "balls", totalBalls
        );
    }

    @Override
    public Map<String, Object> endInnings(Long matchId) {
        List<BallEventEntity> balls = repository.findByMatchId(matchId);

        int totalRuns = balls.stream().mapToInt(BallEventEntity::getTotalRunsThisBall).sum();
        int target = totalRuns + 1; 

        // Send target to MATCH-SERVICE
        restTemplate.put("http://MATCH-SERVICE/matches/setTarget/" + matchId + "?target=" + target, null);

        return Map.of("target", target, "runs", totalRuns);
    }

    @Override
    public Map<String, Object> endMatch(Long matchId) {
        List<BallEventEntity> balls = repository.findByMatchId(matchId);

        int team1Runs = balls.stream()
                .filter(b -> b.getInnings() == 1)
                .mapToInt(BallEventEntity::getTotalRunsThisBall)
                .sum();

        int team2Runs = balls.stream()
                .filter(b -> b.getInnings() == 2)
                .mapToInt(BallEventEntity::getTotalRunsThisBall)
                .sum();

        Long winnerTeamId = team2Runs > team1Runs ? 2L : 1L;

        restTemplate.put("http://MATCH-SERVICE/matches/endMatch/" + matchId + "?winnerTeamId=" + winnerTeamId, null);

        return Map.of("winnerTeamId", winnerTeamId, "team1Runs", team1Runs, "team2Runs", team2Runs);
    }

    private BallEventEntity toEntity(BallEvent e) {
        BallEventEntity ent = new BallEventEntity();
        ent.setEventId(e.getEventId());
        ent.setMatchId(e.getMatchId());
        ent.setInnings(e.getInnings());
        ent.setOver(e.getOver());
        ent.setBallInOver(e.getBallInOver());
        ent.setBatterId(e.getBatterId());
        ent.setNonStrikerId(e.getNonStrikerId());
        ent.setBowlerId(e.getBowlerId());
        ent.setRunsBatsman(e.getRunsBatsman());
        ent.setRunsExtras(e.getRunsExtras());
        ent.setExtraType(e.getExtraType());
        ent.setWicket(e.isWicket());
        ent.setWicketType(e.getWicketType());
        ent.setWicketPlayerId(e.getWicketPlayerId());
        ent.setTotalRunsThisBall(e.getTotalRunsThisBall());
        ent.setTimestamp(e.getTimestamp());
        return ent;
    }

    private BallEvent toDto(BallEventEntity e) {
        BallEvent dto = new BallEvent();
        dto.setEventId(e.getEventId());
        dto.setMatchId(e.getMatchId());
        dto.setInnings(e.getInnings());
        dto.setOver(e.getOver());
        dto.setBallInOver(e.getBallInOver());
        dto.setBatterId(e.getBatterId());
        dto.setNonStrikerId(e.getNonStrikerId());
        dto.setBowlerId(e.getBowlerId());
        dto.setRunsBatsman(e.getRunsBatsman());
        dto.setRunsExtras(e.getRunsExtras());
        dto.setExtraType(e.getExtraType());
        dto.setWicket(e.isWicket());
        dto.setWicketType(e.getWicketType());
        dto.setWicketPlayerId(e.getWicketPlayerId());
        dto.setTotalRunsThisBall(e.getTotalRunsThisBall());
        dto.setTimestamp(e.getTimestamp());
        return dto;
    }
}
