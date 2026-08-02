package com.focusforge.repository;

import com.focusforge.entity.ZohoProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ZohoProgressRepository extends JpaRepository<ZohoProgress, Long> {
    Optional<ZohoProgress> findByUserId(Long userId);
}
