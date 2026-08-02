package com.focusforge.repository;

import com.focusforge.entity.ScheduleBlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleBlockRepository extends JpaRepository<ScheduleBlock, Long> {
    List<ScheduleBlock> findByUserIdOrderByStartTimeAsc(Long userId);
    List<ScheduleBlock> findByUserIdAndDayOfWeekOrderByStartTimeAsc(Long userId, String dayOfWeek);
}
