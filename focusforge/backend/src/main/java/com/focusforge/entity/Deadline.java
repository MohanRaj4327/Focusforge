package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "deadlines")
public class Deadline {

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
    private LocalDateTime dueDate;

    private String priority = "HIGH";
    private String category = "ACADEMIC";
    private Boolean isCompleted = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Deadline() {}

    public Deadline(Long id, User user, String title, String description, LocalDateTime dueDate, String priority, String category, Boolean isCompleted, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority != null ? priority : "HIGH";
        this.category = category != null ? category : "ACADEMIC";
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
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDateTime getDueDate() { return dueDate; }
    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static DeadlineBuilder builder() { return new DeadlineBuilder(); }

    public static class DeadlineBuilder {
        private Long id;
        private User user;
        private String title;
        private String description;
        private LocalDateTime dueDate;
        private String priority = "HIGH";
        private String category = "ACADEMIC";
        private Boolean isCompleted = false;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public DeadlineBuilder id(Long id) { this.id = id; return this; }
        public DeadlineBuilder user(User user) { this.user = user; return this; }
        public DeadlineBuilder title(String title) { this.title = title; return this; }
        public DeadlineBuilder description(String description) { this.description = description; return this; }
        public DeadlineBuilder dueDate(LocalDateTime dueDate) { this.dueDate = dueDate; return this; }
        public DeadlineBuilder priority(String priority) { this.priority = priority; return this; }
        public DeadlineBuilder category(String category) { this.category = category; return this; }
        public DeadlineBuilder isCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; return this; }
        public DeadlineBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public DeadlineBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Deadline build() {
            return new Deadline(id, user, title, description, dueDate, priority, category, isCompleted, createdAt, updatedAt);
        }
    }
}
