package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "timeline_milestones")
public class TimelineMilestone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDate targetDate;

    private Integer monthNumber;
    private Boolean isAchieved = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public TimelineMilestone() {}

    public TimelineMilestone(Long id, User user, String title, String description, LocalDate targetDate, Integer monthNumber, Boolean isAchieved, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.title = title;
        this.description = description;
        this.targetDate = targetDate;
        this.monthNumber = monthNumber;
        this.isAchieved = isAchieved != null ? isAchieved : false;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDate getTargetDate() { return targetDate; }
    public void setTargetDate(LocalDate targetDate) { this.targetDate = targetDate; }
    public Integer getMonthNumber() { return monthNumber; }
    public void setMonthNumber(Integer monthNumber) { this.monthNumber = monthNumber; }
    public Boolean getIsAchieved() { return isAchieved; }
    public void setIsAchieved(Boolean isAchieved) { this.isAchieved = isAchieved; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static TimelineMilestoneBuilder builder() { return new TimelineMilestoneBuilder(); }

    public static class TimelineMilestoneBuilder {
        private Long id;
        private User user;
        private String title;
        private String description;
        private LocalDate targetDate;
        private Integer monthNumber;
        private Boolean isAchieved = false;
        private LocalDateTime createdAt;

        public TimelineMilestoneBuilder id(Long id) { this.id = id; return this; }
        public TimelineMilestoneBuilder user(User user) { this.user = user; return this; }
        public TimelineMilestoneBuilder title(String title) { this.title = title; return this; }
        public TimelineMilestoneBuilder description(String description) { this.description = description; return this; }
        public TimelineMilestoneBuilder targetDate(LocalDate targetDate) { this.targetDate = targetDate; return this; }
        public TimelineMilestoneBuilder monthNumber(Integer monthNumber) { this.monthNumber = monthNumber; return this; }
        public TimelineMilestoneBuilder isAchieved(Boolean isAchieved) { this.isAchieved = isAchieved; return this; }
        public TimelineMilestoneBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public TimelineMilestone build() {
            return new TimelineMilestone(id, user, title, description, targetDate, monthNumber, isAchieved, createdAt);
        }
    }
}
