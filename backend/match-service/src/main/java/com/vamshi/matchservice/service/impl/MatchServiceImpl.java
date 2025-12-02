package com.vamshi.matchservice.service.impl;

import com.vamshi.matchservice.exception.MatchNotFoundException;
import com.vamshi.matchservice.model.Match;
import com.vamshi.matchservice.repository.MatchRepository;
import com.vamshi.matchservice.service.MatchService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchServiceImpl implements MatchService {

    private final MatchRepository repository;

    public MatchServiceImpl(MatchRepository repository) {
        this.repository = repository;
    }

    @Override
    public Match createMatch(Match match) {
        match.setStatus("NOT_STARTED");
        return repository.save(match);
    }

    @Override
    public Match updateMatch(Long id, Match updated) {
        Match existing = repository.findById(id)
                .orElseThrow(() -> new MatchNotFoundException(id));

        existing.setTeamAId(updated.getTeamAId());
        existing.setTeamBId(updated.getTeamBId());
        existing.setTeamALogo(updated.getTeamALogo());
        existing.setTeamBLogo(updated.getTeamBLogo());
        existing.setOvers(updated.getOvers());
        existing.setTossWinnerTeamId(updated.getTossWinnerTeamId());
        existing.setTossDecision(updated.getTossDecision());
        existing.setMatchDate(updated.getMatchDate());
        existing.setVenue(updated.getVenue());
        existing.setStatus(updated.getStatus());
        existing.setWinnerTeamId(updated.getWinnerTeamId());
        existing.setUmpire1(updated.getUmpire1());
        existing.setUmpire2(updated.getUmpire2());
        existing.setMatchType(updated.getMatchType());
        existing.setTargetScore(updated.getTargetScore());

        return repository.save(existing);
    }

    @Override
    public Match getMatchById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new MatchNotFoundException(id));
    }

    @Override
    public List<Match> getAllMatches() {
        return repository.findAll();
    }

    @Override
    public List<Match> getMatchesByTeam(Long teamId) {
        return repository.findByTeamAIdOrTeamBId(teamId, teamId);
    }

    @Override
    public List<Match> getMatchesByStatus(String status) {
        return repository.findByStatus(status);
    }

    @Override
    public void deleteMatch(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Match updateToss(Long id, Long tossWinnerTeamId, String tossDecision) {
        Match match = repository.findById(id)
                .orElseThrow(() -> new MatchNotFoundException(id));
        
        match.setTossWinnerTeamId(tossWinnerTeamId);
        match.setTossDecision(tossDecision.toUpperCase());
        match.setStatus("IN_PROGRESS");
        
        return repository.save(match);
    }

    @Override
    public Match setTarget(Long matchId, int targetScore) {
        Match match = repository.findById(matchId)
                .orElseThrow(() -> new MatchNotFoundException(matchId));

        match.setTargetScore(targetScore);
        match.setStatus("INNINGS_1_COMPLETE");

        return repository.save(match);
    }

    @Override
    public Match endMatch(Long matchId, Long winnerTeamId) {
        Match match = repository.findById(matchId)
                .orElseThrow(() -> new MatchNotFoundException(matchId));

        match.setWinnerTeamId(winnerTeamId);
        match.setStatus("COMPLETED");

        return repository.save(match);
    }
}
