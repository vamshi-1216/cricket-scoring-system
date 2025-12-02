package com.vamshi.statsservice.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "match_scores")
public class MatchScoreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long matchId;
    private Integer innings;      // 1 or 2

    @Column(nullable = true)
    private Long battingTeamId;   // Can be null initially

    private int runs;
    private int wickets;
    private int balls;            // Total legal balls
    private int extras;

    private Instant lastUpdated;

    public MatchScoreEntity() {
    }

    @PrePersist
    @PreUpdate
    public void updateTimestamp() {
        this.lastUpdated = Instant.now();
    }

    // ----- Getters & Setters -----
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getMatchId() { return matchId; }
    public void setMatchId(Long matchId) { this.matchId = matchId; }

    public Integer getInnings() { return innings; }
    public void setInnings(Integer innings) { this.innings = innings; }

    public Long getBattingTeamId() { return battingTeamId; }
    public void setBattingTeamId(Long battingTeamId) { this.battingTeamId = battingTeamId; }

    public int getRuns() { return runs; }
    public void setRuns(int runs) { this.runs = runs; }

    public int getWickets() { return wickets; }
    public void setWickets(int wickets) { this.wickets = wickets; }

    public int getBalls() { return balls; }
    public void setBalls(int balls) { this.balls = balls; }

    public int getExtras() { return extras; }
    public void setExtras(int extras) { this.extras = extras; }

    public Instant getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(Instant lastUpdated) { this.lastUpdated = lastUpdated; }
}
