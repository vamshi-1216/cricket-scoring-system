package com.vamshi.playerservice.service.impl;

import com.vamshi.playerservice.exception.PlayerNotFoundException;
import com.vamshi.playerservice.model.Player;
import com.vamshi.playerservice.repository.PlayerRepository;
import com.vamshi.playerservice.service.PlayerService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository repository;

    public PlayerServiceImpl(PlayerRepository repository) {
        this.repository = repository;
    }

    @Override
    public Player createPlayer(Player player) {
        return repository.save(player);
    } 	

    @Override
    public Player getPlayerById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new PlayerNotFoundException("Player not found: " + id));
    }

    @Override
    public List<Player> getPlayersByTeam(Long teamId) {
        return repository.findByTeamId(teamId);
    }

    @Override
    public List<Player> getAllPlayers() {
        return repository.findAll();
    }

    @Override
    public Player updatePlayer(Long id, Player player) {

        Player existing = repository.findById(id)
                .orElseThrow(() -> new PlayerNotFoundException("Player not found: " + id));

        existing.setName(player.getName());
        existing.setRole(player.getRole());
        existing.setBattingStyle(player.getBattingStyle());
        existing.setBowlingStyle(player.getBowlingStyle());
        existing.setPhotoUrl(player.getPhotoUrl());
        existing.setTeamId(player.getTeamId());

        existing.setBatsman(player.isBatsman());
        existing.setBowler(player.isBowler());
        existing.setFielder(player.isFielder());
        existing.setCaptain(player.isCaptain());
        existing.setWicketKeeper(player.isWicketKeeper());

        return repository.save(existing);
    }

    @Override
    public void deletePlayer(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Player> saveAll(List<Player> players) {
        return repository.saveAll(players);
    }
}
