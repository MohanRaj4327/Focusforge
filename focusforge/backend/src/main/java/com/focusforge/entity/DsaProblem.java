package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "dsa_problems")
public class DsaProblem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private DsaTopic topic;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer monthNumber;

    @Column(nullable = false, length = 20)
    private String difficulty;

    private Boolean isNew = false;

    @Column(nullable = false)
    private Integer problemOrder;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public DsaProblem() {}

    public DsaProblem(Long id, DsaTopic topic, String title, Integer monthNumber, String difficulty, Boolean isNew, Integer problemOrder, LocalDateTime createdAt) {
        this.id = id;
        this.topic = topic;
        this.title = title;
        this.monthNumber = monthNumber;
        this.difficulty = difficulty;
        this.isNew = isNew != null ? isNew : false;
        this.problemOrder = problemOrder;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public DsaTopic getTopic() { return topic; }
    public void setTopic(DsaTopic topic) { this.topic = topic; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Integer getMonthNumber() { return monthNumber; }
    public void setMonthNumber(Integer monthNumber) { this.monthNumber = monthNumber; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public Boolean getIsNew() { return isNew; }
    public void setIsNew(Boolean isNew) { this.isNew = isNew; }
    public Integer getProblemOrder() { return problemOrder; }
    public void setProblemOrder(Integer problemOrder) { this.problemOrder = problemOrder; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static DsaProblemBuilder builder() { return new DsaProblemBuilder(); }

    public static class DsaProblemBuilder {
        private Long id;
        private DsaTopic topic;
        private String title;
        private Integer monthNumber;
        private String difficulty;
        private Boolean isNew = false;
        private Integer problemOrder;
        private LocalDateTime createdAt;

        public DsaProblemBuilder id(Long id) { this.id = id; return this; }
        public DsaProblemBuilder topic(DsaTopic topic) { this.topic = topic; return this; }
        public DsaProblemBuilder title(String title) { this.title = title; return this; }
        public DsaProblemBuilder monthNumber(Integer monthNumber) { this.monthNumber = monthNumber; return this; }
        public DsaProblemBuilder difficulty(String difficulty) { this.difficulty = difficulty; return this; }
        public DsaProblemBuilder isNew(Boolean isNew) { this.isNew = isNew; return this; }
        public DsaProblemBuilder problemOrder(Integer problemOrder) { this.problemOrder = problemOrder; return this; }
        public DsaProblemBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public DsaProblem build() {
            return new DsaProblem(id, topic, title, monthNumber, difficulty, isNew, problemOrder, createdAt);
        }
    }
}
