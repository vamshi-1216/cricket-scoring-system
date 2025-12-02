package com.vamshi.matchservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long teamAId;
    private Long teamBId;

    private String teamALogo;
    private String teamBLogo;

    private int overs;

    private Long tossWinnerTeamId;
    private String tossDecision; // BAT or BOWL

    private LocalDateTime matchDate;

    private String venue;

    /**
     * Match statuses:
     * NOT_STARTED → IN_PROGRESS → INNINGS_1_COMPLETE → IN_PROGRESS (2nd innings) → COMPLETED
     */
    private String status;

    private Long winnerTeamId;

    private String umpire1;
    private String umpire2;

    private String matchType; // T20 / ODI / TEST
    
    private Integer targetScore; // 👈 Added: Target score after first innings

    public Match() {}

    // === Getters and Setters ===
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTeamAId() { return teamAId; }
    public void setTeamAId(Long teamAId) { this.teamAId = teamAId; }

    public Long getTeamBId() { return teamBId; }
    public void setTeamBId(Long teamBId) { this.teamBId = teamBId; }

    public String getTeamALogo() { return teamALogo; }
    public void setTeamALogo(String teamALogo) { this.teamALogo = teamALogo; }

    public String getTeamBLogo() { return teamBLogo; }
    public void setTeamBLogo(String teamBLogo) { this.teamBLogo = teamBLogo; }

    public int getOvers() { return overs; }
    public void setOvers(int overs) { this.overs = overs; }

    public Long getTossWinnerTeamId() { return tossWinnerTeamId; }
    public void setTossWinnerTeamId(Long tossWinnerTeamId) { this.tossWinnerTeamId = tossWinnerTeamId; }

    public String getTossDecision() { return tossDecision; }
    public void setTossDecision(String tossDecision) { this.tossDecision = tossDecision; }

    public LocalDateTime getMatchDate() { return matchDate; }
    public void setMatchDate(LocalDateTime matchDate) { this.matchDate = matchDate; }

    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getWinnerTeamId() { return winnerTeamId; }
    public void setWinnerTeamId(Long winnerTeamId) { this.winnerTeamId = winnerTeamId; }

    public String getUmpire1() { return umpire1; }
    public void setUmpire1(String umpire1) { this.umpire1 = umpire1; }

    public String getUmpire2() { return umpire2; }
    public void setUmpire2(String umpire2) { this.umpire2 = umpire2; }

    public String getMatchType() { return matchType; }
    public void setMatchType(String matchType) { this.matchType = matchType; }

    public Integer getTargetScore() { return targetScore; }
    public void setTargetScore(Integer targetScore) { this.targetScore = targetScore; }
}
