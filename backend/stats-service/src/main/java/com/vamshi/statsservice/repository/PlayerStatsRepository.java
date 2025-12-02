package com.vamshi.statsservice.repository;

import com.vamshi.statsservice.model.PlayerStatsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlayerStatsRepository extends JpaRepository<PlayerStatsEntity, Long> {

    Optional<PlayerStatsEntity> findByMatchIdAndPlayerId(Long matchId, Long playerId);

    List<PlayerStatsEntity> findByPlayerId(Long playerId);

    List<PlayerStatsEntity> findByMatchId(Long matchId);
    

}
