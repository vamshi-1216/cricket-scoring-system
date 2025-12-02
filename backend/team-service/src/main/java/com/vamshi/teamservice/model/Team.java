package com.vamshi.teamservice.model;

import jakarta.persistence.*;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private String coachName;
    private String captain;

    public Team() {}

    public Team(Long id, String name, String location, String coachName, String captain) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.coachName = coachName;
        this.captain = captain;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCoachName() { return coachName; }
    public void setCoachName(String coachName) { this.coachName = coachName; }

    public String getCaptain() { return captain; }
    public void setCaptain(String captain) { this.captain = captain; }
}
