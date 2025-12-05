package com.vamshi.teamservice.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")          // matches DB
    private String name;

    @Column(name = "location")
   // matches DB
    private String location;

    @Column(name = "coach_name")
    @JsonProperty("coachName") // 🔥 FIXED: matches DB column
    private String coachName;

    @Column(name = "captain") 
    @JsonProperty("captain") // matches DB
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
