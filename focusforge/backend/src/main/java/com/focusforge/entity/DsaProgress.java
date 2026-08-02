package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "dsa_progress", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "problem_id"})
})
public class DsaProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id", nullable = false)
    private DsaProblem problem;

    private String status = "UNSOLVED";

    private LocalDate assignedDate;
    private LocalDate solvedDate;

    private Integer attemptCount = 0;
    private Integer timeTakenMinutes = 0;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private String solutionUrl;
    private String codeUrl;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public DsaProgress() {}

    public DsaProgress(Long id, User user, DsaProblem problem, String status, LocalDate assignedDate, LocalDate solvedDate, Integer attemptCount, Integer timeTakenMinutes, String notes, String solutionUrl, String codeUrl, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
        this.problem = problem;
        this.status = status != null ? status : "UNSOLVED";
        this.assignedDate = assignedDate;
        this.solvedDate = solvedDate;
        this.attemptCount = attemptCount != null ? attemptCount : 0;
        this.timeTakenMinutes = timeTakenMinutes != null ? timeTakenMinutes : 0;
        this.notes = notes;
        this.solutionUrl = solutionUrl;
        this.codeUrl = codeUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public DsaProblem getProblem() { return problem; }
    public void setProblem(DsaProblem problem) { this.problem = problem; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getAssignedDate() { return assignedDate; }
    public void setAssignedDate(LocalDate assignedDate) { this.assignedDate = assignedDate; }
    public LocalDate getSolvedDate() { return solvedDate; }
    public void setSolvedDate(LocalDate solvedDate) { this.solvedDate = solvedDate; }
    public Integer getAttemptCount() { return attemptCount; }
    public void setAttemptCount(Integer attemptCount) { this.attemptCount = attemptCount; }
    public Integer getTimeTakenMinutes() { return timeTakenMinutes; }
    public void setTimeTakenMinutes(Integer timeTakenMinutes) { this.timeTakenMinutes = timeTakenMinutes; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getSolutionUrl() { return solutionUrl; }
    public void setSolutionUrl(String solutionUrl) { this.solutionUrl = solutionUrl; }
    public String getCodeUrl() { return codeUrl; }
    public void setCodeUrl(String codeUrl) { this.codeUrl = codeUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static DsaProgressBuilder builder() { return new DsaProgressBuilder(); }

    public static class DsaProgressBuilder {
        private Long id;
        private User user;
        private DsaProblem problem;
        private String status = "UNSOLVED";
        private LocalDate assignedDate;
        private LocalDate solvedDate;
        private Integer attemptCount = 0;
        private Integer timeTakenMinutes = 0;
        private String notes;
        private String solutionUrl;
        private String codeUrl;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public DsaProgressBuilder id(Long id) { this.id = id; return this; }
        public DsaProgressBuilder user(User user) { this.user = user; return this; }
        public DsaProgressBuilder problem(DsaProblem problem) { this.problem = problem; return this; }
        public DsaProgressBuilder status(String status) { this.status = status; return this; }
        public DsaProgressBuilder assignedDate(LocalDate assignedDate) { this.assignedDate = assignedDate; return this; }
        public DsaProgressBuilder solvedDate(LocalDate solvedDate) { this.solvedDate = solvedDate; return this; }
        public DsaProgressBuilder attemptCount(Integer attemptCount) { this.attemptCount = attemptCount; return this; }
        public DsaProgressBuilder timeTakenMinutes(Integer timeTakenMinutes) { this.timeTakenMinutes = timeTakenMinutes; return this; }
        public DsaProgressBuilder notes(String notes) { this.notes = notes; return this; }
        public DsaProgressBuilder solutionUrl(String solutionUrl) { this.solutionUrl = solutionUrl; return this; }
        public DsaProgressBuilder codeUrl(String codeUrl) { this.codeUrl = codeUrl; return this; }
        public DsaProgressBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public DsaProgressBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public DsaProgress build() {
            return new DsaProgress(id, user, problem, status, assignedDate, solvedDate, attemptCount, timeTakenMinutes, notes, solutionUrl, codeUrl, createdAt, updatedAt);
        }
    }
}
