package com.vamshi.matchservice.controller;

import com.vamshi.matchservice.model.Match;
import com.vamshi.matchservice.service.MatchService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/matches")
public class MatchController {

    private final MatchService service;

    public MatchController(MatchService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Match> createMatch(@RequestBody Match match) {
        return ResponseEntity.ok(service.createMatch(match));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Match> updateMatch(@PathVariable Long id, @RequestBody Match match) {
        return ResponseEntity.ok(service.updateMatch(id, match));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatch(@PathVariable Long id) {
        return ResponseEntity.ok(service.getMatchById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Match>> getAllMatches() {
        return ResponseEntity.ok(service.getAllMatches());
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<Match>> getMatchesByTeam(@PathVariable Long teamId) {
        return ResponseEntity.ok(service.getMatchesByTeam(teamId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Match>> getMatchesByStatus(@PathVariable String status) {
        return ResponseEntity.ok(service.getMatchesByStatus(status));
    }

    @GetMapping("/live")
    public ResponseEntity<List<Match>> getLiveMatches() {
        return ResponseEntity.ok(service.getMatchesByStatus("IN_PROGRESS"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(@PathVariable Long id) {
        service.deleteMatch(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/toss")
    public ResponseEntity<Match> updateToss(
            @PathVariable Long id,
            @RequestParam Long tossWinnerTeamId,
            @RequestParam String tossDecision) {
        return ResponseEntity.ok(service.updateToss(id, tossWinnerTeamId, tossDecision));
    }

    // 🔥 Set Target for Second Innings
    @PutMapping("/{id}/setTarget")
    public ResponseEntity<Match> setTarget(
            @PathVariable Long id,
            @RequestParam int targetScore) {
        return ResponseEntity.ok(service.setTarget(id, targetScore));
    }

    // 🏁 End Match & Save Winner
    @PutMapping("/{id}/endMatch")
    public ResponseEntity<Match> endMatch(
            @PathVariable Long id,
            @RequestParam Long winnerTeamId) {
        return ResponseEntity.ok(service.endMatch(id, winnerTeamId));
    }
}
