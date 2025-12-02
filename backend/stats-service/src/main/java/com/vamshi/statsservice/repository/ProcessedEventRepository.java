package com.vamshi.statsservice.repository;

import com.vamshi.statsservice.model.ProcessedEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessedEventRepository extends JpaRepository<ProcessedEventEntity, String> {
    boolean existsByEventId(String eventId);
}
