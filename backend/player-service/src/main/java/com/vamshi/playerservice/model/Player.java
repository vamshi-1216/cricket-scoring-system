package com.vamshi.playerservice.model;

import jakarta.persistence.*;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String role;            
    private String battingStyle;
    private String bowlingStyle;
    private String photoUrl;

    private Long teamId;

    private boolean isBatsman;
    private boolean isBowler;
    private boolean isFielder;

    private boolean isCaptain;
    private boolean isWicketKeeper;

    public Player() {}

    // Getters & setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getBattingStyle() { return battingStyle; }
    public void setBattingStyle(String battingStyle) { this.battingStyle = battingStyle; }

    public String getBowlingStyle() { return bowlingStyle; }
    public void setBowlingStyle(String bowlingStyle) { this.bowlingStyle = bowlingStyle; }

    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }

    public Long getTeamId() { return teamId; }
    public void setTeamId(Long teamId) { this.teamId = teamId; }

    public boolean isBatsman() { return isBatsman; }
    public void setBatsman(boolean batsman) { isBatsman = batsman; }

    public boolean isBowler() { return isBowler; }
    public void setBowler(boolean bowler) { isBowler = bowler; }

    public boolean isFielder() { return isFielder; }
    public void setFielder(boolean fielder) { isFielder = fielder; }

    public boolean isCaptain() { return isCaptain; }
    public void setCaptain(boolean captain) { isCaptain = captain; }

    public boolean isWicketKeeper() { return isWicketKeeper; }
    public void setWicketKeeper(boolean wicketKeeper) { isWicketKeeper = wicketKeeper; }
}
