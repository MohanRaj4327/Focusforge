package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "focus_sessions")
public class FocusSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    private Task task;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dsa_problem_id")
    private DsaProblem dsaProblem;

    @Column(nullable = false)
    private LocalDateTime startTime;

    private LocalDateTime endTime;
    private Integer durationMinutes = 25;
    private String sessionType = "POMODORO";
    private Boolean completed = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public FocusSession() {}

    public FocusSession(Long id, User user, Task task, DsaProblem dsaProblem, LocalDateTime startTime, LocalDateTime endTime, Integer durationMinutes, String sessionType, Boolean completed, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.task = task;
        this.dsaProblem = dsaProblem;
        this.startTime = startTime;
        this.endTime = endTime;
        this.durationMinutes = durationMinutes != null ? durationMinutes : 25;
        this.sessionType = sessionType != null ? sessionType : "POMODORO";
        this.completed = completed != null ? completed : true;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Task getTask() { return task; }
    public void setTask(Task task) { this.task = task; }
    public DsaProblem getDsaProblem() { return dsaProblem; }
    public void setDsaProblem(DsaProblem dsaProblem) { this.dsaProblem = dsaProblem; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
    public String getSessionType() { return sessionType; }
    public void setSessionType(String sessionType) { this.sessionType = sessionType; }
    public Boolean getCompleted() { return completed; }
    public void setCompleted(Boolean completed) { this.completed = completed; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static FocusSessionBuilder builder() { return new FocusSessionBuilder(); }

    public static class FocusSessionBuilder {
        private Long id;
        private User user;
        private Task task;
        private DsaProblem dsaProblem;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private Integer durationMinutes = 25;
        private String sessionType = "POMODORO";
        private Boolean completed = true;
        private LocalDateTime createdAt;

        public FocusSessionBuilder id(Long id) { this.id = id; return this; }
        public FocusSessionBuilder user(User user) { this.user = user; return this; }
        public FocusSessionBuilder task(Task task) { this.task = task; return this; }
        public FocusSessionBuilder dsaProblem(DsaProblem dsaProblem) { this.dsaProblem = dsaProblem; return this; }
        public FocusSessionBuilder startTime(LocalDateTime startTime) { this.startTime = startTime; return this; }
        public FocusSessionBuilder endTime(LocalDateTime endTime) { this.endTime = endTime; return this; }
        public FocusSessionBuilder durationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; return this; }
        public FocusSessionBuilder sessionType(String sessionType) { this.sessionType = sessionType; return this; }
        public FocusSessionBuilder completed(Boolean completed) { this.completed = completed; return this; }
        public FocusSessionBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public FocusSession build() {
            return new FocusSession(id, user, task, dsaProblem, startTime, endTime, durationMinutes, sessionType, completed, createdAt);
        }
    }
}
