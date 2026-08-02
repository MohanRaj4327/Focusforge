package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String fullName;
    private String bio;
    private String targetCompany = "Zoho";
    private Integer dailyFocusGoalMinutes = 240;
    private Integer targetDsaPerDay = 3;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Profile() {}

    public Profile(Long id, User user, String fullName, String bio, String targetCompany, Integer dailyFocusGoalMinutes, Integer targetDsaPerDay, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
        this.fullName = fullName;
        this.bio = bio;
        this.targetCompany = targetCompany != null ? targetCompany : "Zoho";
        this.dailyFocusGoalMinutes = dailyFocusGoalMinutes != null ? dailyFocusGoalMinutes : 240;
        this.targetDsaPerDay = targetDsaPerDay != null ? targetDsaPerDay : 3;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getTargetCompany() { return targetCompany; }
    public void setTargetCompany(String targetCompany) { this.targetCompany = targetCompany; }
    public Integer getDailyFocusGoalMinutes() { return dailyFocusGoalMinutes; }
    public void setDailyFocusGoalMinutes(Integer dailyFocusGoalMinutes) { this.dailyFocusGoalMinutes = dailyFocusGoalMinutes; }
    public Integer getTargetDsaPerDay() { return targetDsaPerDay; }
    public void setTargetDsaPerDay(Integer targetDsaPerDay) { this.targetDsaPerDay = targetDsaPerDay; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static ProfileBuilder builder() { return new ProfileBuilder(); }

    public static class ProfileBuilder {
        private Long id;
        private User user;
        private String fullName;
        private String bio;
        private String targetCompany = "Zoho";
        private Integer dailyFocusGoalMinutes = 240;
        private Integer targetDsaPerDay = 3;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public ProfileBuilder id(Long id) { this.id = id; return this; }
        public ProfileBuilder user(User user) { this.user = user; return this; }
        public ProfileBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public ProfileBuilder bio(String bio) { this.bio = bio; return this; }
        public ProfileBuilder targetCompany(String targetCompany) { this.targetCompany = targetCompany; return this; }
        public ProfileBuilder dailyFocusGoalMinutes(Integer dailyFocusGoalMinutes) { this.dailyFocusGoalMinutes = dailyFocusGoalMinutes; return this; }
        public ProfileBuilder targetDsaPerDay(Integer targetDsaPerDay) { this.targetDsaPerDay = targetDsaPerDay; return this; }
        public ProfileBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public ProfileBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Profile build() {
            return new Profile(id, user, fullName, bio, targetCompany, dailyFocusGoalMinutes, targetDsaPerDay, createdAt, updatedAt);
        }
    }
}
