package com.vamshi.scoringservice.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "ball_events", indexes = {
        @Index(name = "idx_matchid", columnList = "matchId")
})
public class BallEventEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String eventId;

    private Long matchId;
    private int innings;

    @Column(name = "over_number")   // FIX: avoid reserved SQL keyword 'over'
    private int over;

    @Column(name = "ball_number")   // Better naming
    private int ballInOver;

    private Long batterId;
    private Long nonStrikerId;
    private Long bowlerId;
    private int runsBatsman;
    private int runsExtras;
    private String extraType;
    private boolean isWicket;
    private String wicketType;
    private Long wicketPlayerId;
    private int totalRunsThisBall;
    private Instant timestamp;
    private String source;

    @Column(unique = true)
    private String idempotencyKey;

    public BallEventEntity() {}

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public Long getMatchId() {
        return matchId;
    }

    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    public int getInnings() {
        return innings;
    }

    public void setInnings(int innings) {
        this.innings = innings;
    }

    public int getOver() {
        return over;
    }

    public void setOver(int over) {
        this.over = over;
    }

    public int getBallInOver() {
        return ballInOver;
    }

    public void setBallInOver(int ballInOver) {
        this.ballInOver = ballInOver;
    }

    public Long getBatterId() {
        return batterId;
    }

    public void setBatterId(Long batterId) {
        this.batterId = batterId;
    }

    public Long getNonStrikerId() {
        return nonStrikerId;
    }

    public void setNonStrikerId(Long nonStrikerId) {
        this.nonStrikerId = nonStrikerId;
    }

    public Long getBowlerId() {
        return bowlerId;
    }

    public void setBowlerId(Long bowlerId) {
        this.bowlerId = bowlerId;
    }

    public int getRunsBatsman() {
        return runsBatsman;
    }

    public void setRunsBatsman(int runsBatsman) {
        this.runsBatsman = runsBatsman;
    }

    public int getRunsExtras() {
        return runsExtras;
    }

    public void setRunsExtras(int runsExtras) {
        this.runsExtras = runsExtras;
    }

    public String getExtraType() {
        return extraType;
    }

    public void setExtraType(String extraType) {
        this.extraType = extraType;
    }

    public boolean isWicket() {
        return isWicket;
    }

    public void setWicket(boolean wicket) {
        isWicket = wicket;
    }

    public String getWicketType() {
        return wicketType;
    }

    public void setWicketType(String wicketType) {
        this.wicketType = wicketType;
    }

    public Long getWicketPlayerId() {
        return wicketPlayerId;
    }

    public void setWicketPlayerId(Long wicketPlayerId) {
        this.wicketPlayerId = wicketPlayerId;
    }

    public int getTotalRunsThisBall() {
        return totalRunsThisBall;
    }

    public void setTotalRunsThisBall(int totalRunsThisBall) {
        this.totalRunsThisBall = totalRunsThisBall;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getIdempotencyKey() {
        return idempotencyKey;
    }

    public void setIdempotencyKey(String idempotencyKey) {
        this.idempotencyKey = idempotencyKey;
    }
}
