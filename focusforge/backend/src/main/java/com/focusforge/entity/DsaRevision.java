package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "dsa_revisions")
public class DsaRevision {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id", nullable = false)
    private DsaProblem problem;

    private Integer revisionStage = 1;

    @Column(nullable = false)
    private LocalDate scheduledDate;

    private LocalDate completedDate;

    private Boolean isCompleted = false;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public DsaRevision() {}

    public DsaRevision(Long id, User user, DsaProblem problem, Integer revisionStage, LocalDate scheduledDate, LocalDate completedDate, Boolean isCompleted, String notes, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
        this.problem = problem;
        this.revisionStage = revisionStage != null ? revisionStage : 1;
        this.scheduledDate = scheduledDate;
        this.completedDate = completedDate;
        this.isCompleted = isCompleted != null ? isCompleted : false;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public DsaProblem getProblem() { return problem; }
    public void setProblem(DsaProblem problem) { this.problem = problem; }
    public Integer getRevisionStage() { return revisionStage; }
    public void setRevisionStage(Integer revisionStage) { this.revisionStage = revisionStage; }
    public LocalDate getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(LocalDate scheduledDate) { this.scheduledDate = scheduledDate; }
    public LocalDate getCompletedDate() { return completedDate; }
    public void setCompletedDate(LocalDate completedDate) { this.completedDate = completedDate; }
    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static DsaRevisionBuilder builder() { return new DsaRevisionBuilder(); }

    public static class DsaRevisionBuilder {
        private Long id;
        private User user;
        private DsaProblem problem;
        private Integer revisionStage = 1;
        private LocalDate scheduledDate;
        private LocalDate completedDate;
        private Boolean isCompleted = false;
        private String notes;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public DsaRevisionBuilder id(Long id) { this.id = id; return this; }
        public DsaRevisionBuilder user(User user) { this.user = user; return this; }
        public DsaRevisionBuilder problem(DsaProblem problem) { this.problem = problem; return this; }
        public DsaRevisionBuilder revisionStage(Integer revisionStage) { this.revisionStage = revisionStage; return this; }
        public DsaRevisionBuilder scheduledDate(LocalDate scheduledDate) { this.scheduledDate = scheduledDate; return this; }
        public DsaRevisionBuilder completedDate(LocalDate completedDate) { this.completedDate = completedDate; return this; }
        public DsaRevisionBuilder isCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; return this; }
        public DsaRevisionBuilder notes(String notes) { this.notes = notes; return this; }
        public DsaRevisionBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public DsaRevisionBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public DsaRevision build() {
            return new DsaRevision(id, user, problem, revisionStage, scheduledDate, completedDate, isCompleted, notes, createdAt, updatedAt);
        }
    }
}
