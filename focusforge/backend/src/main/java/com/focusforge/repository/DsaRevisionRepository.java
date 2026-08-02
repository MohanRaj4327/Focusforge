package com.focusforge.repository;

import com.focusforge.entity.DsaRevision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DsaRevisionRepository extends JpaRepository<DsaRevision, Long> {
    List<DsaRevision> findByUserId(Long userId);
    List<DsaRevision> findByUserIdAndScheduledDateAndIsCompletedFalse(Long userId, LocalDate date);
    List<DsaRevision> findByUserIdAndScheduledDateBeforeAndIsCompletedFalse(Long userId, LocalDate date);
    List<DsaRevision> findByUserIdAndScheduledDateAfterAndIsCompletedFalse(Long userId, LocalDate date);

    @Query("SELECT COUNT(dr) FROM DsaRevision dr WHERE dr.user.id = :userId AND dr.scheduledDate = :date AND dr.isCompleted = false")
    long countDueToday(Long userId, LocalDate date);
}
