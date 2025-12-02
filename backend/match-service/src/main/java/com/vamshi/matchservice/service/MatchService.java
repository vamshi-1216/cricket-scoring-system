package com.vamshi.matchservice.service;

import com.vamshi.matchservice.model.Match;

import java.util.List;

public interface MatchService {

    Match createMatch(Match match);

    Match updateMatch(Long id, Match match);

    Match getMatchById(Long id);

    List<Match> getAllMatches();

    List<Match> getMatchesByTeam(Long teamId);

    List<Match> getMatchesByStatus(String status);

    void deleteMatch(Long id);

    Match updateToss(Long id, Long tossWinnerTeamId, String tossDecision);

    Match setTarget(Long matchId, int targetScore);

    Match endMatch(Long matchId, Long winnerTeamId);
}
