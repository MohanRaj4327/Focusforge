package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "academic_tasks")
public class AcademicTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private AcademicSubject subject;

    @Column(nullable = false)
    private String title;

    private String type = "ASSIGNMENT";
    private LocalDate dueDate;
    private Boolean isCompleted = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public AcademicTask() {}

    public AcademicTask(Long id, AcademicSubject subject, String title, String type, LocalDate dueDate, Boolean isCompleted, LocalDateTime createdAt) {
        this.id = id;
        this.subject = subject;
        this.title = title;
        this.type = type != null ? type : "ASSIGNMENT";
        this.dueDate = dueDate;
        this.isCompleted = isCompleted != null ? isCompleted : false;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public AcademicSubject getSubject() { return subject; }
    public void setSubject(AcademicSubject subject) { this.subject = subject; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
    public Boolean getIsCompleted() { return isCompleted; }
    public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static AcademicTaskBuilder builder() { return new AcademicTaskBuilder(); }

    public static class AcademicTaskBuilder {
        private Long id;
        private AcademicSubject subject;
        private String title;
        private String type = "ASSIGNMENT";
        private LocalDate dueDate;
        private Boolean isCompleted = false;
        private LocalDateTime createdAt;

        public AcademicTaskBuilder id(Long id) { this.id = id; return this; }
        public AcademicTaskBuilder subject(AcademicSubject subject) { this.subject = subject; return this; }
        public AcademicTaskBuilder title(String title) { this.title = title; return this; }
        public AcademicTaskBuilder type(String type) { this.type = type; return this; }
        public AcademicTaskBuilder dueDate(LocalDate dueDate) { this.dueDate = dueDate; return this; }
        public AcademicTaskBuilder isCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; return this; }
        public AcademicTaskBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public AcademicTask build() {
            return new AcademicTask(id, subject, title, type, dueDate, isCompleted, createdAt);
        }
    }
}
