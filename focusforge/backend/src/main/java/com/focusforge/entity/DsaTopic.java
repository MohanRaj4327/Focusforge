package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "dsa_topics")
public class DsaTopic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String topicName;

    @Column(nullable = false)
    private Integer monthNumber;

    @Column(nullable = false)
    private Integer targetProblemCount;

    @Column(columnDefinition = "TEXT")
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public DsaTopic() {}

    public DsaTopic(Long id, String topicName, Integer monthNumber, Integer targetProblemCount, String description, LocalDateTime createdAt) {
        this.id = id;
        this.topicName = topicName;
        this.monthNumber = monthNumber;
        this.targetProblemCount = targetProblemCount;
        this.description = description;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTopicName() { return topicName; }
    public void setTopicName(String topicName) { this.topicName = topicName; }
    public Integer getMonthNumber() { return monthNumber; }
    public void setMonthNumber(Integer monthNumber) { this.monthNumber = monthNumber; }
    public Integer getTargetProblemCount() { return targetProblemCount; }
    public void setTargetProblemCount(Integer targetProblemCount) { this.targetProblemCount = targetProblemCount; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static DsaTopicBuilder builder() { return new DsaTopicBuilder(); }

    public static class DsaTopicBuilder {
        private Long id;
        private String topicName;
        private Integer monthNumber;
        private Integer targetProblemCount;
        private String description;
        private LocalDateTime createdAt;

        public DsaTopicBuilder id(Long id) { this.id = id; return this; }
        public DsaTopicBuilder topicName(String topicName) { this.topicName = topicName; return this; }
        public DsaTopicBuilder monthNumber(Integer monthNumber) { this.monthNumber = monthNumber; return this; }
        public DsaTopicBuilder targetProblemCount(Integer targetProblemCount) { this.targetProblemCount = targetProblemCount; return this; }
        public DsaTopicBuilder description(String description) { this.description = description; return this; }
        public DsaTopicBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public DsaTopic build() {
            return new DsaTopic(id, topicName, monthNumber, targetProblemCount, description, createdAt);
        }
    }
}
