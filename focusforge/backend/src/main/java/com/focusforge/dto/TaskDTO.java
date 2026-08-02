package com.focusforge.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

public class TaskDTO {

    public static class TaskRequest {
        @NotBlank(message = "Task title is required")
        private String title;

        private String description;
        private Long categoryId;
        private String priority;
        private String status;
        private LocalDate dueDate;
        private Integer estimatedMinutes;

        public TaskRequest() {}

        public TaskRequest(String title, String description, Long categoryId, String priority, String status, LocalDate dueDate, Integer estimatedMinutes) {
            this.title = title;
            this.description = description;
            this.categoryId = categoryId;
            this.priority = priority;
            this.status = status;
            this.dueDate = dueDate;
            this.estimatedMinutes = estimatedMinutes;
        }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public LocalDate getDueDate() { return dueDate; }
        public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
        public Integer getEstimatedMinutes() { return estimatedMinutes; }
        public void setEstimatedMinutes(Integer estimatedMinutes) { this.estimatedMinutes = estimatedMinutes; }
    }

    public static class TaskResponse {
        private Long id;
        private String title;
        private String description;
        private Long categoryId;
        private String categoryName;
        private String categoryColor;
        private String priority;
        private String status;
        private LocalDate dueDate;
        private Integer estimatedMinutes;
        private Boolean isCompleted;
        private String completedAt;
        private String createdAt;

        public TaskResponse() {}

        public TaskResponse(Long id, String title, String description, Long categoryId, String categoryName, String categoryColor, String priority, String status, LocalDate dueDate, Integer estimatedMinutes, Boolean isCompleted, String completedAt, String createdAt) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.categoryId = categoryId;
            this.categoryName = categoryName;
            this.categoryColor = categoryColor;
            this.priority = priority;
            this.status = status;
            this.dueDate = dueDate;
            this.estimatedMinutes = estimatedMinutes;
            this.isCompleted = isCompleted;
            this.completedAt = completedAt;
            this.createdAt = createdAt;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
        public String getCategoryName() { return categoryName; }
        public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
        public String getCategoryColor() { return categoryColor; }
        public void setCategoryColor(String categoryColor) { this.categoryColor = categoryColor; }
        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public LocalDate getDueDate() { return dueDate; }
        public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
        public Integer getEstimatedMinutes() { return estimatedMinutes; }
        public void setEstimatedMinutes(Integer estimatedMinutes) { this.estimatedMinutes = estimatedMinutes; }
        public Boolean getIsCompleted() { return isCompleted; }
        public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }
        public String getCompletedAt() { return completedAt; }
        public void setCompletedAt(String completedAt) { this.completedAt = completedAt; }
        public String getCreatedAt() { return createdAt; }
        public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

        public static TaskResponseBuilder builder() { return new TaskResponseBuilder(); }

        public static class TaskResponseBuilder {
            private Long id;
            private String title;
            private String description;
            private Long categoryId;
            private String categoryName;
            private String categoryColor;
            private String priority;
            private String status;
            private LocalDate dueDate;
            private Integer estimatedMinutes;
            private Boolean isCompleted;
            private String completedAt;
            private String createdAt;

            public TaskResponseBuilder id(Long id) { this.id = id; return this; }
            public TaskResponseBuilder title(String title) { this.title = title; return this; }
            public TaskResponseBuilder description(String description) { this.description = description; return this; }
            public TaskResponseBuilder categoryId(Long categoryId) { this.categoryId = categoryId; return this; }
            public TaskResponseBuilder categoryName(String categoryName) { this.categoryName = categoryName; return this; }
            public TaskResponseBuilder categoryColor(String categoryColor) { this.categoryColor = categoryColor; return this; }
            public TaskResponseBuilder priority(String priority) { this.priority = priority; return this; }
            public TaskResponseBuilder status(String status) { this.status = status; return this; }
            public TaskResponseBuilder dueDate(LocalDate dueDate) { this.dueDate = dueDate; return this; }
            public TaskResponseBuilder estimatedMinutes(Integer estimatedMinutes) { this.estimatedMinutes = estimatedMinutes; return this; }
            public TaskResponseBuilder isCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; return this; }
            public TaskResponseBuilder completedAt(String completedAt) { this.completedAt = completedAt; return this; }
            public TaskResponseBuilder createdAt(String createdAt) { this.createdAt = createdAt; return this; }

            public TaskResponse build() {
                return new TaskResponse(id, title, description, categoryId, categoryName, categoryColor, priority, status, dueDate, estimatedMinutes, isCompleted, completedAt, createdAt);
            }
        }
    }
}
