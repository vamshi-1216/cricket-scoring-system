package com.vamshi.playerservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vamshi.playerservice.model.Player;
import java.util.List;

public interface PlayerRepository extends JpaRepository<Player,Long> {

	List<Player> findByTeamId(Long teamId);
	

}
