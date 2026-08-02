package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "calendar_events")
public class CalendarEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    private String eventType = "ACADEMIC";

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public CalendarEvent() {}

    public CalendarEvent(Long id, User user, String title, String description, LocalDateTime startTime, LocalDateTime endTime, String eventType, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.title = title;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.eventType = eventType != null ? eventType : "ACADEMIC";
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
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static CalendarEventBuilder builder() { return new CalendarEventBuilder(); }

    public static class CalendarEventBuilder {
        private Long id;
        private User user;
        private String title;
        private String description;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private String eventType = "ACADEMIC";
        private LocalDateTime createdAt;

        public CalendarEventBuilder id(Long id) { this.id = id; return this; }
        public CalendarEventBuilder user(User user) { this.user = user; return this; }
        public CalendarEventBuilder title(String title) { this.title = title; return this; }
        public CalendarEventBuilder description(String description) { this.description = description; return this; }
        public CalendarEventBuilder startTime(LocalDateTime startTime) { this.startTime = startTime; return this; }
        public CalendarEventBuilder endTime(LocalDateTime endTime) { this.endTime = endTime; return this; }
        public CalendarEventBuilder eventType(String eventType) { this.eventType = eventType; return this; }
        public CalendarEventBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public CalendarEvent build() {
            return new CalendarEvent(id, user, title, description, startTime, endTime, eventType, createdAt);
        }
    }
}
