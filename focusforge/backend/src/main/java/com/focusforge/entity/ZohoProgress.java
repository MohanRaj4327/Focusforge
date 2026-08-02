package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "zoho_progress")
public class ZohoProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private Integer round1AptitudeScore = 0;
    private Integer round2ProgrammingScore = 0;
    private Integer round3DesignScore = 0;
    private Boolean HRRoundReady = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public ZohoProgress() {}

    public ZohoProgress(Long id, User user, Integer round1AptitudeScore, Integer round2ProgrammingScore, Integer round3DesignScore, Boolean HRRoundReady, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
        this.round1AptitudeScore = round1AptitudeScore != null ? round1AptitudeScore : 0;
        this.round2ProgrammingScore = round2ProgrammingScore != null ? round2ProgrammingScore : 0;
        this.round3DesignScore = round3DesignScore != null ? round3DesignScore : 0;
        this.HRRoundReady = HRRoundReady != null ? HRRoundReady : false;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Integer getRound1AptitudeScore() { return round1AptitudeScore; }
    public void setRound1AptitudeScore(Integer round1AptitudeScore) { this.round1AptitudeScore = round1AptitudeScore; }
    public Integer getRound2ProgrammingScore() { return round2ProgrammingScore; }
    public void setRound2ProgrammingScore(Integer round2ProgrammingScore) { this.round2ProgrammingScore = round2ProgrammingScore; }
    public Integer getRound3DesignScore() { return round3DesignScore; }
    public void setRound3DesignScore(Integer round3DesignScore) { this.round3DesignScore = round3DesignScore; }
    public Boolean getHRRoundReady() { return HRRoundReady; }
    public void setHRRoundReady(Boolean HRRoundReady) { this.HRRoundReady = HRRoundReady; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static ZohoProgressBuilder builder() { return new ZohoProgressBuilder(); }

    public static class ZohoProgressBuilder {
        private Long id;
        private User user;
        private Integer round1AptitudeScore = 0;
        private Integer round2ProgrammingScore = 0;
        private Integer round3DesignScore = 0;
        private Boolean HRRoundReady = false;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public ZohoProgressBuilder id(Long id) { this.id = id; return this; }
        public ZohoProgressBuilder user(User user) { this.user = user; return this; }
        public ZohoProgressBuilder round1AptitudeScore(Integer round1AptitudeScore) { this.round1AptitudeScore = round1AptitudeScore; return this; }
        public ZohoProgressBuilder round2ProgrammingScore(Integer round2ProgrammingScore) { this.round2ProgrammingScore = round2ProgrammingScore; return this; }
        public ZohoProgressBuilder round3DesignScore(Integer round3DesignScore) { this.round3DesignScore = round3DesignScore; return this; }
        public ZohoProgressBuilder HRRoundReady(Boolean HRRoundReady) { this.HRRoundReady = HRRoundReady; return this; }
        public ZohoProgressBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public ZohoProgressBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public ZohoProgress build() {
            return new ZohoProgress(id, user, round1AptitudeScore, round2ProgrammingScore, round3DesignScore, HRRoundReady, createdAt, updatedAt);
        }
    }
}
