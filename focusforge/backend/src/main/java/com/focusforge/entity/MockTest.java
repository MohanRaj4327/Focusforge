package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "mock_tests")
public class MockTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 150)
    private String title;

    private String platform = "LEETCODE";
    private Integer score = 0;
    private Integer totalScore = 100;
    private LocalDate testDate;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public MockTest() {}

    public MockTest(Long id, User user, String title, String platform, Integer score, Integer totalScore, LocalDate testDate, String notes, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.title = title;
        this.platform = platform != null ? platform : "LEETCODE";
        this.score = score != null ? score : 0;
        this.totalScore = totalScore != null ? totalScore : 100;
        this.testDate = testDate;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }
    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
    public Integer getTotalScore() { return totalScore; }
    public void setTotalScore(Integer totalScore) { this.totalScore = totalScore; }
    public LocalDate getTestDate() { return testDate; }
    public void setTestDate(LocalDate testDate) { this.testDate = testDate; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static MockTestBuilder builder() { return new MockTestBuilder(); }

    public static class MockTestBuilder {
        private Long id;
        private User user;
        private String title;
        private String platform = "LEETCODE";
        private Integer score = 0;
        private Integer totalScore = 100;
        private LocalDate testDate;
        private String notes;
        private LocalDateTime createdAt;

        public MockTestBuilder id(Long id) { this.id = id; return this; }
        public MockTestBuilder user(User user) { this.user = user; return this; }
        public MockTestBuilder title(String title) { this.title = title; return this; }
        public MockTestBuilder platform(String platform) { this.platform = platform; return this; }
        public MockTestBuilder score(Integer score) { this.score = score; return this; }
        public MockTestBuilder totalScore(Integer totalScore) { this.totalScore = totalScore; return this; }
        public MockTestBuilder testDate(LocalDate testDate) { this.testDate = testDate; return this; }
        public MockTestBuilder notes(String notes) { this.notes = notes; return this; }
        public MockTestBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public MockTest build() {
            return new MockTest(id, user, title, platform, score, totalScore, testDate, notes, createdAt);
        }
    }
}
