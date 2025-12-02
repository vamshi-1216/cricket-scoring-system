package com.vamshi.statsservice.dto;

import java.time.Instant;

public class BallEvent {

    private String eventId;
    private Long matchId;
    private Integer innings;

    private Integer over;
    private Integer ballInOver;

    private Long batterId;
    private Long nonStrikerId;
    private Long bowlerId;

    private Integer runsBatsman;
    private Integer runsExtras;
    private String extraType;          // "WD", "NB", "LB", "B", etc.

    private boolean wicket;
    private String wicketType;        // "BOWLED", "LBW", "RUN_OUT", etc.
    private Long wicketPlayerId;      // player who got out

    private Integer totalRunsThisBall;

    private Instant timestamp;
    private String source;
    private String idempotencyKey;

    // ==== getters & setters ====
    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }

    public Long getMatchId() { return matchId; }
    public void setMatchId(Long matchId) { this.matchId = matchId; }

    public Integer getInnings() { return innings; }
    public void setInnings(Integer innings) { this.innings = innings; }

    public Integer getOver() { return over; }
    public void setOver(Integer over) { this.over = over; }

    public Integer getBallInOver() { return ballInOver; }
    public void setBallInOver(Integer ballInOver) { this.ballInOver = ballInOver; }

    public Long getBatterId() { return batterId; }
    public void setBatterId(Long batterId) { this.batterId = batterId; }

    public Long getNonStrikerId() { return nonStrikerId; }
    public void setNonStrikerId(Long nonStrikerId) { this.nonStrikerId = nonStrikerId; }

    public Long getBowlerId() { return bowlerId; }
    public void setBowlerId(Long bowlerId) { this.bowlerId = bowlerId; }

    public Integer getRunsBatsman() { return runsBatsman; }
    public void setRunsBatsman(Integer runsBatsman) { this.runsBatsman = runsBatsman; }

    public Integer getRunsExtras() { return runsExtras; }
    public void setRunsExtras(Integer runsExtras) { this.runsExtras = runsExtras; }

    public String getExtraType() { return extraType; }
    public void setExtraType(String extraType) { this.extraType = extraType; }

    public boolean isWicket() { return wicket; }
    public void setWicket(boolean wicket) { this.wicket = wicket; }

    public String getWicketType() { return wicketType; }
    public void setWicketType(String wicketType) { this.wicketType = wicketType; }

    public Long getWicketPlayerId() { return wicketPlayerId; }
    public void setWicketPlayerId(Long wicketPlayerId) { this.wicketPlayerId = wicketPlayerId; }

    public Integer getTotalRunsThisBall() { return totalRunsThisBall; }
    public void setTotalRunsThisBall(Integer totalRunsThisBall) { this.totalRunsThisBall = totalRunsThisBall; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getIdempotencyKey() { return idempotencyKey; }
    public void setIdempotencyKey(String idempotencyKey) { this.idempotencyKey = idempotencyKey; }
}
