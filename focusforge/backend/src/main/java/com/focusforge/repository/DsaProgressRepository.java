package com.focusforge.repository;

import com.focusforge.entity.DsaProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DsaProgressRepository extends JpaRepository<DsaProgress, Long> {
    List<DsaProgress> findByUserId(Long userId);
    Optional<DsaProgress> findByUserIdAndProblemId(Long userId, Long problemId);

    @Query("SELECT COUNT(dp) FROM DsaProgress dp WHERE dp.user.id = :userId AND dp.status = 'SOLVED'")
    long countSolvedByUserId(Long userId);

    @Query("SELECT COUNT(dp) FROM DsaProgress dp WHERE dp.user.id = :userId AND dp.problem.monthNumber = :monthNumber AND dp.status = 'SOLVED'")
    long countSolvedByUserIdAndMonthNumber(Long userId, Integer monthNumber);
}
