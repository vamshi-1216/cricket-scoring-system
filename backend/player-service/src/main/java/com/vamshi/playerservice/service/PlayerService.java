package com.vamshi.playerservice.service;

import com.vamshi.playerservice.model.Player;

import java.util.List;

public interface PlayerService {

    Player createPlayer(Player player);

    Player getPlayerById(Long id);

    List<Player> getPlayersByTeam(Long teamId);

    List<Player> getAllPlayers();

    Player updatePlayer(Long id, Player player);

    void deletePlayer(Long id);
    
    List<Player> saveAll(List<Player> players);
}
