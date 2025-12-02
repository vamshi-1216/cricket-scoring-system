package com.vamshi.teamservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vamshi.teamservice.model.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {
	
}
