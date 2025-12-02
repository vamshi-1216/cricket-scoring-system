package com.vamshi.matchservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vamshi.matchservice.model.Match;

import java.util.*;
public interface MatchRepository extends JpaRepository<Match,Long>{
	
	List<Match> findByTeamAIdOrTeamBId(long teamAId,long teamBId);
	List<Match>  findByStatus(String status);

}
