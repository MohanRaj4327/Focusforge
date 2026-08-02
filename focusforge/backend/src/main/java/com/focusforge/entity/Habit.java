package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "habits")
public class Habit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String name;

    private String frequency = "DAILY";
    private Integer targetDays = 30;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Habit() {}

    public Habit(Long id, User user, String name, String frequency, Integer targetDays, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.frequency = frequency != null ? frequency : "DAILY";
        this.targetDays = targetDays != null ? targetDays : 30;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getFrequency() { return frequency; }
    public void setFrequency(String frequency) { this.frequency = frequency; }
    public Integer getTargetDays() { return targetDays; }
    public void setTargetDays(Integer targetDays) { this.targetDays = targetDays; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static HabitBuilder builder() { return new HabitBuilder(); }

    public static class HabitBuilder {
        private Long id;
        private User user;
        private String name;
        private String frequency = "DAILY";
        private Integer targetDays = 30;
        private LocalDateTime createdAt;

        public HabitBuilder id(Long id) { this.id = id; return this; }
        public HabitBuilder user(User user) { this.user = user; return this; }
        public HabitBuilder name(String name) { this.name = name; return this; }
        public HabitBuilder frequency(String frequency) { this.frequency = frequency; return this; }
        public HabitBuilder targetDays(Integer targetDays) { this.targetDays = targetDays; return this; }
        public HabitBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Habit build() {
            return new Habit(id, user, name, frequency, targetDays, createdAt);
        }
    }
}
