package com.focusforge.repository;

import com.focusforge.entity.DsaTopic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DsaTopicRepository extends JpaRepository<DsaTopic, Long> {
    List<DsaTopic> findByMonthNumberOrderByTopicNameAsc(Integer monthNumber);
    Optional<DsaTopic> findByTopicName(String topicName);
}
