package com.focusforge.repository;

import com.focusforge.entity.AptitudeTopic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AptitudeTopicRepository extends JpaRepository<AptitudeTopic, Long> {
    List<AptitudeTopic> findByCategory(String category);
}
