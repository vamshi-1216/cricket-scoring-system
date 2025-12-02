package com.vamshi.teamservice.service.impl;

import com.vamshi.teamservice.model.Team;
import com.vamshi.teamservice.repository.TeamRepository;
import com.vamshi.teamservice.service.TeamService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;

    public TeamServiceImpl(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public Team createTeam(Team team) {
        return teamRepository.save(team);
    }

    @Override
    public Team getTeamById(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Team not found with id: " + id));
    }

    @Override
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    @Override
    public Team updateTeam(Long id, Team updated) {
        Team existing = getTeamById(id);

        existing.setName(updated.getName());
        existing.setLocation(updated.getLocation());
        existing.setCoachName(updated.getCoachName());
        existing.setCaptain(updated.getCaptain());

        return teamRepository.save(existing);
    }

    @Override
    public void deleteTeam(Long id) {
        Team team = getTeamById(id);
        teamRepository.delete(team);
    }
}
