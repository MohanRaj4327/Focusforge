package com.focusforge.repository;

import com.focusforge.entity.AptitudeSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AptitudeSessionRepository extends JpaRepository<AptitudeSession, Long> {
    List<AptitudeSession> findByUserIdOrderByTakenAtDesc(Long userId);
}
