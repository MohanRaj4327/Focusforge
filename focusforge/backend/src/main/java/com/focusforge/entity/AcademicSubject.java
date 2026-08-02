package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "academic_subjects")
public class AcademicSubject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String subjectName;

    private String professorName;
    private String creditHours;
    private String targetGrade = "O";

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public AcademicSubject() {}

    public AcademicSubject(Long id, User user, String subjectName, String professorName, String creditHours, String targetGrade, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.subjectName = subjectName;
        this.professorName = professorName;
        this.creditHours = creditHours;
        this.targetGrade = targetGrade != null ? targetGrade : "O";
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getSubjectName() { return subjectName; }
    public void setSubjectName(String subjectName) { this.subjectName = subjectName; }
    public String getProfessorName() { return professorName; }
    public void setProfessorName(String professorName) { this.professorName = professorName; }
    public String getCreditHours() { return creditHours; }
    public void setCreditHours(String creditHours) { this.creditHours = creditHours; }
    public String getTargetGrade() { return targetGrade; }
    public void setTargetGrade(String targetGrade) { this.targetGrade = targetGrade; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static AcademicSubjectBuilder builder() { return new AcademicSubjectBuilder(); }

    public static class AcademicSubjectBuilder {
        private Long id;
        private User user;
        private String subjectName;
        private String professorName;
        private String creditHours;
        private String targetGrade = "O";
        private LocalDateTime createdAt;

        public AcademicSubjectBuilder id(Long id) { this.id = id; return this; }
        public AcademicSubjectBuilder user(User user) { this.user = user; return this; }
        public AcademicSubjectBuilder subjectName(String subjectName) { this.subjectName = subjectName; return this; }
        public AcademicSubjectBuilder professorName(String professorName) { this.professorName = professorName; return this; }
        public AcademicSubjectBuilder creditHours(String creditHours) { this.creditHours = creditHours; return this; }
        public AcademicSubjectBuilder targetGrade(String targetGrade) { this.targetGrade = targetGrade; return this; }
        public AcademicSubjectBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public AcademicSubject build() {
            return new AcademicSubject(id, user, subjectName, professorName, creditHours, targetGrade, createdAt);
        }
    }
}
