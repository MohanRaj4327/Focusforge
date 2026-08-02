package com.focusforge.repository;

import com.focusforge.entity.Deadline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DeadlineRepository extends JpaRepository<Deadline, Long> {
    List<Deadline> findByUserIdOrderByDueDateAsc(Long userId);
    List<Deadline> findByUserIdAndIsCompletedFalseOrderByDueDateAsc(Long userId);
    List<Deadline> findByUserIdAndDueDateBetweenAndIsCompletedFalseOrderByDueDateAsc(Long userId, LocalDateTime start, LocalDateTime end);
}
