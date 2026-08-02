package com.focusforge.repository;

import com.focusforge.entity.Task;
import com.focusforge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserIdOrderByDueDateAsc(Long userId);
    List<Task> findByUserIdAndDueDate(Long userId, LocalDate dueDate);
    List<Task> findByUserIdAndIsCompletedFalseOrderByDueDateAsc(Long userId);
    List<Task> findByUserIdAndDueDateLessThanAndIsCompletedFalse(Long userId, LocalDate date);
    
    @Query("SELECT COUNT(t) FROM Task t WHERE t.user.id = :userId AND t.dueDate = :date")
    long countTotalTasksForToday(Long userId, LocalDate date);

    @Query("SELECT COUNT(t) FROM Task t WHERE t.user.id = :userId AND t.dueDate = :date AND t.isCompleted = true")
    long countCompletedTasksForToday(Long userId, LocalDate date);
}
