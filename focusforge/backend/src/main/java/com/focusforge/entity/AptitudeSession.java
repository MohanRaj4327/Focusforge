package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "aptitude_sessions")
public class AptitudeSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private AptitudeTopic topic;

    private Integer questionsAttempted = 0;
    private Integer correctAnswers = 0;
    private Integer durationMinutes = 30;

    @CreationTimestamp
    private LocalDateTime takenAt;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public AptitudeSession() {}

    public AptitudeSession(Long id, User user, AptitudeTopic topic, Integer questionsAttempted, Integer correctAnswers, Integer durationMinutes, LocalDateTime takenAt, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.topic = topic;
        this.questionsAttempted = questionsAttempted != null ? questionsAttempted : 0;
        this.correctAnswers = correctAnswers != null ? correctAnswers : 0;
        this.durationMinutes = durationMinutes != null ? durationMinutes : 30;
        this.takenAt = takenAt;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public AptitudeTopic getTopic() { return topic; }
    public void setTopic(AptitudeTopic topic) { this.topic = topic; }
    public Integer getQuestionsAttempted() { return questionsAttempted; }
    public void setQuestionsAttempted(Integer questionsAttempted) { this.questionsAttempted = questionsAttempted; }
    public Integer getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(Integer correctAnswers) { this.correctAnswers = correctAnswers; }
    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
    public LocalDateTime getTakenAt() { return takenAt; }
    public void setTakenAt(LocalDateTime takenAt) { this.takenAt = takenAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static AptitudeSessionBuilder builder() { return new AptitudeSessionBuilder(); }

    public static class AptitudeSessionBuilder {
        private Long id;
        private User user;
        private AptitudeTopic topic;
        private Integer questionsAttempted = 0;
        private Integer correctAnswers = 0;
        private Integer durationMinutes = 30;
        private LocalDateTime takenAt;
        private LocalDateTime createdAt;

        public AptitudeSessionBuilder id(Long id) { this.id = id; return this; }
        public AptitudeSessionBuilder user(User user) { this.user = user; return this; }
        public AptitudeSessionBuilder topic(AptitudeTopic topic) { this.topic = topic; return this; }
        public AptitudeSessionBuilder questionsAttempted(Integer questionsAttempted) { this.questionsAttempted = questionsAttempted; return this; }
        public AptitudeSessionBuilder correctAnswers(Integer correctAnswers) { this.correctAnswers = correctAnswers; return this; }
        public AptitudeSessionBuilder durationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; return this; }
        public AptitudeSessionBuilder takenAt(LocalDateTime takenAt) { this.takenAt = takenAt; return this; }
        public AptitudeSessionBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public AptitudeSession build() {
            return new AptitudeSession(id, user, topic, questionsAttempted, correctAnswers, durationMinutes, takenAt, createdAt);
        }
    }
}
