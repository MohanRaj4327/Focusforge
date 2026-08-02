package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "schedule_blocks")
public class ScheduleBlock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 10)
    private String startTime;

    @Column(nullable = false, length = 10)
    private String endTime;

    private String dayOfWeek = "ALL";
    private String activityType = "STUDY";
    private Boolean isCompleted = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public ScheduleBlock() {}

    public ScheduleBlock(Long id, User user, String title, String startTime, String endTime, String dayOfWeek, String activityType, Boolean isCompleted, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.dayOfWeek = dayOfWeek != null ? dayOfWeek : "ALL";
        this.activityType = activityType != null ? activityType : "STUDY";
        this.isCompleted = isCompleted != null ? isCompleted : false;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }
    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }
    public String getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }
    public String getActivityType() { return activityType; }
    public void setActivityType(String activityType) { this.activityType = activityType; }
    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static ScheduleBlockBuilder builder() { return new ScheduleBlockBuilder(); }

    public static class ScheduleBlockBuilder {
        private Long id;
        private User user;
        private String title;
        private String startTime;
        private String endTime;
        private String dayOfWeek = "ALL";
        private String activityType = "STUDY";
        private Boolean isCompleted = false;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public ScheduleBlockBuilder id(Long id) { this.id = id; return this; }
        public ScheduleBlockBuilder user(User user) { this.user = user; return this; }
        public ScheduleBlockBuilder title(String title) { this.title = title; return this; }
        public ScheduleBlockBuilder startTime(String startTime) { this.startTime = startTime; return this; }
        public ScheduleBlockBuilder endTime(String endTime) { this.endTime = endTime; return this; }
        public ScheduleBlockBuilder dayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; return this; }
        public ScheduleBlockBuilder activityType(String activityType) { this.activityType = activityType; return this; }
        public ScheduleBlockBuilder isCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; return this; }
        public ScheduleBlockBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public ScheduleBlockBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public ScheduleBlock build() {
            return new ScheduleBlock(id, user, title, startTime, endTime, dayOfWeek, activityType, isCompleted, createdAt, updatedAt);
        }
    }
}
