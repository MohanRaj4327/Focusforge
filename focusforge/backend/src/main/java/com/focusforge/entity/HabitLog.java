package com.focusforge.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "habit_logs")
public class HabitLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "habit_id", nullable = false)
    private Habit habit;

    @Column(nullable = false)
    private LocalDate logDate;

    private Boolean isCompleted = true;

    public HabitLog() {}

    public HabitLog(Long id, User user, Habit habit, LocalDate logDate, Boolean isCompleted) {
        this.id = id;
        this.user = user;
        this.habit = habit;
        this.logDate = logDate;
        this.isCompleted = isCompleted != null ? isCompleted : true;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Habit getHabit() { return habit; }
    public void setHabit(Habit habit) { this.habit = habit; }
    public LocalDate getLogDate() { return logDate; }
    public void setLogDate(LocalDate logDate) { this.logDate = logDate; }
    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }

    public static HabitLogBuilder builder() { return new HabitLogBuilder(); }

    public static class HabitLogBuilder {
        private Long id;
        private User user;
        private Habit habit;
        private LocalDate logDate;
        private Boolean isCompleted = true;

        public HabitLogBuilder id(Long id) { this.id = id; return this; }
        public HabitLogBuilder user(User user) { this.user = user; return this; }
        public HabitLogBuilder habit(Habit habit) { this.habit = habit; return this; }
        public HabitLogBuilder logDate(LocalDate logDate) { this.logDate = logDate; return this; }
        public HabitLogBuilder isCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; return this; }

        public HabitLog build() {
            return new HabitLog(id, user, habit, logDate, isCompleted);
        }
    }
}
