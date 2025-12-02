package com.vamshi.statsservice.service.impl;

import com.vamshi.statsservice.dto.BallEvent;
import com.vamshi.statsservice.model.MatchScoreEntity;
import com.vamshi.statsservice.model.PlayerStatsEntity;
import com.vamshi.statsservice.model.ProcessedEventEntity;
import com.vamshi.statsservice.repository.MatchScoreRepository;
import com.vamshi.statsservice.repository.PlayerStatsRepository;
import com.vamshi.statsservice.repository.ProcessedEventRepository;
import com.vamshi.statsservice.service.StatsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class StatsServiceImpl implements StatsService {

    private final MatchScoreRepository matchScoreRepository;
    private final PlayerStatsRepository playerStatsRepository;
    private final ProcessedEventRepository processedEventRepository;

    public StatsServiceImpl(MatchScoreRepository matchScoreRepository,
                            PlayerStatsRepository playerStatsRepository,
                            ProcessedEventRepository processedEventRepository) {
        this.matchScoreRepository = matchScoreRepository;
        this.playerStatsRepository = playerStatsRepository;
        this.processedEventRepository = processedEventRepository;
    }

    @Override
    @Transactional
    public void processBallEvent(BallEvent event) {
        if (event.getEventId() == null) {
            // should not happen, but avoid crashing
            return;
        }

        // Idempotency check
        if (processedEventRepository.existsByEventId(event.getEventId())) {
            return;
        }

        boolean countsAsBall = !isNonCountingDelivery(event.getExtraType());

        // ---- Update Match Score ----
        MatchScoreEntity matchScore = matchScoreRepository
                .findByMatchIdAndInnings(event.getMatchId(), event.getInnings())
                .orElseGet(() -> {
                    MatchScoreEntity m = new MatchScoreEntity();
                    m.setMatchId(event.getMatchId());
                    m.setInnings(event.getInnings());
                    m.setRuns(0);
                    m.setWickets(0);
                    m.setBalls(0);
                    m.setExtras(0);
                    return m;
                });

        int totalRuns = safe(event.getTotalRunsThisBall());
        int batsmanRuns = safe(event.getRunsBatsman());
        int extraRuns = safe(event.getRunsExtras());

        matchScore.setRuns(matchScore.getRuns() + totalRuns);
        matchScore.setExtras(matchScore.getExtras() + extraRuns);

        if (countsAsBall) {
            matchScore.setBalls(matchScore.getBalls() + 1);
        }

        if (event.isWicket() && isBowlingWicket(event.getWicketType())) {
            matchScore.setWickets(matchScore.getWickets() + 1);
        }

        matchScore.setLastUpdated(Instant.now());
        matchScoreRepository.save(matchScore);

        // ---- Update Batter stats ----
        if (event.getBatterId() != null) {
            PlayerStatsEntity batter = playerStatsRepository
                    .findByMatchIdAndPlayerId(event.getMatchId(), event.getBatterId())
                    .orElseGet(() -> {
                        PlayerStatsEntity p = new PlayerStatsEntity();
                        p.setMatchId(event.getMatchId());
                        p.setPlayerId(event.getBatterId());
                        return p;
                    });

            batter.setRunsScored(batter.getRunsScored() + batsmanRuns);
            if (countsAsBall) {
                batter.setBallsFaced(batter.getBallsFaced() + 1);
            }
            if (batsmanRuns == 4) {
                batter.setFours(batter.getFours() + 1);
            } else if (batsmanRuns == 6) {
                batter.setSixes(batter.getSixes() + 1);
            }

            playerStatsRepository.save(batter);
        }

        // ---- Update Bowler stats ----
        if (event.getBowlerId() != null) {
            PlayerStatsEntity bowler = playerStatsRepository
                    .findByMatchIdAndPlayerId(event.getMatchId(), event.getBowlerId())
                    .orElseGet(() -> {
                        PlayerStatsEntity p = new PlayerStatsEntity();
                        p.setMatchId(event.getMatchId());
                        p.setPlayerId(event.getBowlerId());
                        return p;
                    });

            bowler.setRunsConceded(bowler.getRunsConceded() + totalRuns);
            if (countsAsBall) {
                bowler.setBallsBowled(bowler.getBallsBowled() + 1);
            }
            if (event.isWicket() && isBowlingWicket(event.getWicketType())) {
                bowler.setWickets(bowler.getWickets() + 1);
            }

            playerStatsRepository.save(bowler);
        }

        // Mark event as processed
        processedEventRepository.save(new ProcessedEventEntity(event.getEventId(), Instant.now()));
    }

    private boolean isNonCountingDelivery(String extraType) {
        if (extraType == null) return false;
        String t = extraType.trim().toUpperCase();
        return "WD".equals(t) || "NB".equals(t);
    }

    private boolean isBowlingWicket(String wicketType) {
        if (wicketType == null) return true; // safe default
        String t = wicketType.trim().toUpperCase();
        return !t.equals("RUN_OUT") && !t.equals("RETIRE") && !t.equals("OBSTRUCTING_FIELD");
    }

    private int safe(Integer v) {
        return v == null ? 0 : v;
    }

    @Override
    public Optional<MatchScoreEntity> getMatchScore(Long matchId, Integer innings) {
        return matchScoreRepository.findByMatchIdAndInnings(matchId, innings);
    }

    @Override
    public List<PlayerStatsEntity> getPlayerStats(Long playerId) {
        return playerStatsRepository.findByPlayerId(playerId);
    }

    @Override
    public Optional<PlayerStatsEntity> getPlayerStatsForMatch(Long matchId, Long playerId) {
        return playerStatsRepository.findByMatchIdAndPlayerId(matchId, playerId);
    }
    
    public List<PlayerStatsEntity> getAllPlayersStatsForMatch(Long matchId) {
        return playerStatsRepository.findByMatchId(matchId);
    }

}
