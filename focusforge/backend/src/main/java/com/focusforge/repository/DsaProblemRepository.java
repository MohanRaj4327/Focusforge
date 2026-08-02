package com.focusforge.repository;

import com.focusforge.entity.DsaProblem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DsaProblemRepository extends JpaRepository<DsaProblem, Long> {
    List<DsaProblem> findByTopicIdOrderByProblemOrderAsc(Long topicId);
    List<DsaProblem> findByMonthNumberOrderByProblemOrderAsc(Integer monthNumber);
    long countByMonthNumber(Integer monthNumber);
}
