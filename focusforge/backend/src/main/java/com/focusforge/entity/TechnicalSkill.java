package com.focusforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "technical_skills")
public class TechnicalSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String name;

    private String category = "CORE_JAVA";
    private Integer proficiencyLevel = 50;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public TechnicalSkill() {}

    public TechnicalSkill(Long id, User user, String name, String category, Integer proficiencyLevel, LocalDateTime createdAt) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.category = category != null ? category : "CORE_JAVA";
        this.proficiencyLevel = proficiencyLevel != null ? proficiencyLevel : 50;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Integer getProficiencyLevel() { return proficiencyLevel; }
    public void setProficiencyLevel(Integer proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static TechnicalSkillBuilder builder() { return new TechnicalSkillBuilder(); }

    public static class TechnicalSkillBuilder {
        private Long id;
        private User user;
        private String name;
        private String category = "CORE_JAVA";
        private Integer proficiencyLevel = 50;
        private LocalDateTime createdAt;

        public TechnicalSkillBuilder id(Long id) { this.id = id; return this; }
        public TechnicalSkillBuilder user(User user) { this.user = user; return this; }
        public TechnicalSkillBuilder name(String name) { this.name = name; return this; }
        public TechnicalSkillBuilder category(String category) { this.category = category; return this; }
        public TechnicalSkillBuilder proficiencyLevel(Integer proficiencyLevel) { this.proficiencyLevel = proficiencyLevel; return this; }
        public TechnicalSkillBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public TechnicalSkill build() {
            return new TechnicalSkill(id, user, name, category, proficiencyLevel, createdAt);
        }
    }
}
