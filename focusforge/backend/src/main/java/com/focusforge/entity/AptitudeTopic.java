package com.focusforge.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "aptitude_topics")
public class AptitudeTopic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(nullable = false, length = 50)
    private String category; // QUANTITATIVE, LOGICAL, VERBAL

    @Column(columnDefinition = "TEXT")
    private String description;

    public AptitudeTopic() {}

    public AptitudeTopic(Long id, String name, String category, String description) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public static AptitudeTopicBuilder builder() { return new AptitudeTopicBuilder(); }

    public static class AptitudeTopicBuilder {
        private Long id;
        private String name;
        private String category;
        private String description;

        public AptitudeTopicBuilder id(Long id) { this.id = id; return this; }
        public AptitudeTopicBuilder name(String name) { this.name = name; return this; }
        public AptitudeTopicBuilder category(String category) { this.category = category; return this; }
        public AptitudeTopicBuilder description(String description) { this.description = description; return this; }

        public AptitudeTopic build() {
            return new AptitudeTopic(id, name, category, description);
        }
    }
}
