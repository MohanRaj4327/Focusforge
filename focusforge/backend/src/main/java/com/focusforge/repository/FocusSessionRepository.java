package com.focusforge.repository;

import com.focusforge.entity.FocusSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FocusSessionRepository extends JpaRepository<FocusSession, Long> {
    List<FocusSession> findByUserIdOrderByStartTimeDesc(Long userId);
    List<FocusSession> findByUserIdAndStartTimeBetween(Long userId, LocalDateTime start, LocalDateTime end);

    @Query("SELECT COALESCE(SUM(fs.durationMinutes), 0) FROM FocusSession fs WHERE fs.user.id = :userId AND fs.startTime >= :start AND fs.completed = true")
    int sumDurationMinutesByUserIdAndStartTimeAfter(Long userId, LocalDateTime start);
}
