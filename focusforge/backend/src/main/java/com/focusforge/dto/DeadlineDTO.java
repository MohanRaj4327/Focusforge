package com.focusforge.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class DeadlineDTO {

    public static class DeadlineRequest {
        @NotBlank(message = "Title is required")
        private String title;

        private String description;

        @NotNull(message = "Due date and time is required")
        private LocalDateTime dueDate;

        private String priority;
        private String category;
        private Boolean isCompleted;

        public DeadlineRequest() {}

        public DeadlineRequest(String title, String description, LocalDateTime dueDate, String priority, String category, Boolean isCompleted) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.category = category;
            this.isCompleted = isCompleted;
        }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public LocalDateTime getDueDate() { return dueDate; }
        public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }
        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public Boolean getIsCompleted() { return isCompleted; }
        public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }
    }

    public static class DeadlineResponse {
        private Long id;
        private String title;
        private String description;
        private LocalDateTime dueDate;
        private String priority;
        private String category;
        private Boolean isCompleted;

        public DeadlineResponse() {}

        public DeadlineResponse(Long id, String title, String description, LocalDateTime dueDate, String priority, String category, Boolean isCompleted) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.category = category;
            this.isCompleted = isCompleted;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public LocalDateTime getDueDate() { return dueDate; }
        public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }
        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public Boolean getIsCompleted() { return isCompleted; }
        public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }

        public static DeadlineResponseBuilder builder() { return new DeadlineResponseBuilder(); }

        public static class DeadlineResponseBuilder {
            private Long id;
            private String title;
            private String description;
            private LocalDateTime dueDate;
            private String priority;
            private String category;
            private Boolean isCompleted;

            public DeadlineResponseBuilder id(Long id) { this.id = id; return this; }
            public DeadlineResponseBuilder title(String title) { this.title = title; return this; }
            public DeadlineResponseBuilder description(String description) { this.description = description; return this; }
            public DeadlineResponseBuilder dueDate(LocalDateTime dueDate) { this.dueDate = dueDate; return this; }
            public DeadlineResponseBuilder priority(String priority) { this.priority = priority; return this; }
            public DeadlineResponseBuilder category(String category) { this.category = category; return this; }
            public DeadlineResponseBuilder isCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; return this; }

            public DeadlineResponse build() {
                return new DeadlineResponse(id, title, description, dueDate, priority, category, isCompleted);
            }
        }
    }
}
