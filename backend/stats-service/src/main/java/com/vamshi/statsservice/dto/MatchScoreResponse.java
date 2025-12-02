package com.vamshi.statsservice.dto;

public class MatchScoreResponse {

    private Long matchId;
    private Integer innings;
    private int runs;
    private int wickets;
    private String overs;    // e.g. "12.3"
    private int extras;

    public Long getMatchId() { return matchId; }
    public void setMatchId(Long matchId) { this.matchId = matchId; }

    public Integer getInnings() { return innings; }
    public void setInnings(Integer innings) { this.innings = innings; }

    public int getRuns() { return runs; }
    public void setRuns(int runs) { this.runs = runs; }

    public int getWickets() { return wickets; }
    public void setWickets(int wickets) { this.wickets = wickets; }

    public String getOvers() { return overs; }
    public void setOvers(String overs) { this.overs = overs; }

    public int getExtras() { return extras; }
    public void setExtras(int extras) { this.extras = extras; }
}
