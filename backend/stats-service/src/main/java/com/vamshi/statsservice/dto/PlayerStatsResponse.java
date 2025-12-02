package com.vamshi.statsservice.dto;

public class PlayerStatsResponse {

    private Long matchId;
    private Long playerId;

    private int runsScored;
    private int ballsFaced;
    private int fours;
    private int sixes;

    private String oversBowled;  // "3.2" style
    private int runsConceded;
    private int wickets;

    public Long getMatchId() { return matchId; }
    public void setMatchId(Long matchId) { this.matchId = matchId; }

    public Long getPlayerId() { return playerId; }
    public void setPlayerId(Long playerId) { this.playerId = playerId; }

    public int getRunsScored() { return runsScored; }
    public void setRunsScored(int runsScored) { this.runsScored = runsScored; }

    public int getBallsFaced() { return ballsFaced; }
    public void setBallsFaced(int ballsFaced) { this.ballsFaced = ballsFaced; }

    public int getFours() { return fours; }
    public void setFours(int fours) { this.fours = fours; }

    public int getSixes() { return sixes; }
    public void setSixes(int sixes) { this.sixes = sixes; }

    public String getOversBowled() { return oversBowled; }
    public void setOversBowled(String oversBowled) { this.oversBowled = oversBowled; }

    public int getRunsConceded() { return runsConceded; }
    public void setRunsConceded(int runsConceded) { this.runsConceded = runsConceded; }

    public int getWickets() { return wickets; }
    public void setWickets(int wickets) { this.wickets = wickets; }
}
