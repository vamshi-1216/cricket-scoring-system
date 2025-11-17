package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "balls")
@Data
public class Ball {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long matchId;
    private Long overId;

    private Integer ballNumber;
    private Integer runs;
    private Boolean isWicket;
}
