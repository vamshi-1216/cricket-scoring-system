package com.vamshi.scoringservice.repository;

import com.vamshi.scoringservice.model.BallEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BallEventRepository extends JpaRepository<BallEventEntity, Long> {

    boolean existsByEventId(String eventId);

    List<BallEventEntity> findByMatchId(Long matchId);

    List<BallEventEntity> findByMatchIdOrderByInningsAscOverAscBallInOverAsc(Long matchId);
}
