package com.vamshi.playerservice.controller;

import com.vamshi.playerservice.model.Player;
import com.vamshi.playerservice.service.PlayerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/players")

public class PlayerController {

    private final PlayerService service;

    public PlayerController(PlayerService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        return ResponseEntity.ok(service.createPlayer(player));
    }
    
    @PostMapping("/bulk")
    public ResponseEntity<Object> addPlayers(@RequestBody List<Player> players) {
        return ResponseEntity.ok(service.saveAll(players));
    }


    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayer(@PathVariable Long id) {
        return ResponseEntity.ok(service.getPlayerById(id));
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<Player>> getPlayersByTeam(@PathVariable Long teamId) {
        return ResponseEntity.ok(service.getPlayersByTeam(teamId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Player>> getAllPlayers() {
        return ResponseEntity.ok(service.getAllPlayers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Player> updatePlayer(@PathVariable Long id, @RequestBody Player player) {
        return ResponseEntity.ok(service.updatePlayer(id, player));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long id) {
        service.deletePlayer(id);
        return ResponseEntity.noContent().build();
    }
}
