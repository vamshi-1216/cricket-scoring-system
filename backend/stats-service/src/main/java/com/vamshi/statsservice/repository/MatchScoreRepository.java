package com.vamshi.statsservice.repository;

import com.vamshi.statsservice.model.MatchScoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MatchScoreRepository extends JpaRepository<MatchScoreEntity, Long> {

    Optional<MatchScoreEntity> findByMatchIdAndInnings(Long matchId, Integer innings);
}
