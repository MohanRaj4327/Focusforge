package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "task_categories")
public class TaskCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(length = 20)
    private String color = "#6366f1";

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public TaskCategory() {}

    public TaskCategory(Long id, User user, String name, String color, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.color = color != null ? color : "#6366f1";
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static TaskCategoryBuilder builder() { return new TaskCategoryBuilder(); }

    public static class TaskCategoryBuilder {
        private Long id;
        private User user;
        private String name;
        private String color = "#6366f1";
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public TaskCategoryBuilder id(Long id) { this.id = id; return this; }
        public TaskCategoryBuilder user(User user) { this.user = user; return this; }
        public TaskCategoryBuilder name(String name) { this.name = name; return this; }
        public TaskCategoryBuilder color(String color) { this.color = color; return this; }
        public TaskCategoryBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public TaskCategoryBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public TaskCategory build() {
            return new TaskCategory(id, user, name, color, createdAt, updatedAt);
        }
    }
}
