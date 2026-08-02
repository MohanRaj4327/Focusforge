package com.focusforge.dto;

import jakarta.validation.constraints.NotBlank;

public class ScheduleDTO {

    public static class ScheduleBlockRequest {
        @NotBlank(message = "Title is required")
        private String title;

        @NotBlank(message = "Start time is required (e.g. 09:00)")
        private String startTime;

        @NotBlank(message = "End time is required (e.g. 10:30)")
        private String endTime;

        private String dayOfWeek;
        private String activityType;
        private Boolean isCompleted;

        public ScheduleBlockRequest() {}

        public ScheduleBlockRequest(String title, String startTime, String endTime, String dayOfWeek, String activityType, Boolean isCompleted) {
            this.title = title;
            this.startTime = startTime;
            this.endTime = endTime;
            this.dayOfWeek = dayOfWeek;
            this.activityType = activityType;
            this.isCompleted = isCompleted;
        }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getStartTime() { return startTime; }
        public void setStartTime(String startTime) { this.startTime = startTime; }
        public String getEndTime() { return endTime; }
        public void setEndTime(String endTime) { this.endTime = endTime; }
        public String getDayOfWeek() { return dayOfWeek; }
        public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }
        public String getActivityType() { return activityType; }
        public void setActivityType(String activityType) { this.activityType = activityType; }
        public Boolean getIsCompleted() { return isCompleted; }
        public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }
    }

    public static class ScheduleBlockResponse {
        private Long id;
        private String title;
        private String startTime;
        private String endTime;
        private String dayOfWeek;
        private String activityType;
        private Boolean isCompleted;

        public ScheduleBlockResponse() {}

        public ScheduleBlockResponse(Long id, String title, String startTime, String endTime, String dayOfWeek, String activityType, Boolean isCompleted) {
            this.id = id;
            this.title = title;
            this.startTime = startTime;
            this.endTime = endTime;
            this.dayOfWeek = dayOfWeek;
            this.activityType = activityType;
            this.isCompleted = isCompleted;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getStartTime() { return startTime; }
        public void setStartTime(String startTime) { this.startTime = startTime; }
        public String getEndTime() { return endTime; }
        public void setEndTime(String endTime) { this.endTime = endTime; }
        public String getDayOfWeek() { return dayOfWeek; }
        public void setDayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; }
        public String getActivityType() { return activityType; }
        public void setActivityType(String activityType) { this.activityType = activityType; }
        public Boolean getIsCompleted() { return isCompleted; }
        public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }

        public static ScheduleBlockResponseBuilder builder() { return new ScheduleBlockResponseBuilder(); }

        public static class ScheduleBlockResponseBuilder {
            private Long id;
            private String title;
            private String startTime;
            private String endTime;
            private String dayOfWeek;
            private String activityType;
            private Boolean isCompleted;

            public ScheduleBlockResponseBuilder id(Long id) { this.id = id; return this; }
            public ScheduleBlockResponseBuilder title(String title) { this.title = title; return this; }
            public ScheduleBlockResponseBuilder startTime(String startTime) { this.startTime = startTime; return this; }
            public ScheduleBlockResponseBuilder endTime(String endTime) { this.endTime = endTime; return this; }
            public ScheduleBlockResponseBuilder dayOfWeek(String dayOfWeek) { this.dayOfWeek = dayOfWeek; return this; }
            public ScheduleBlockResponseBuilder activityType(String activityType) { this.activityType = activityType; return this; }
            public ScheduleBlockResponseBuilder isCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; return this; }

            public ScheduleBlockResponse build() {
                return new ScheduleBlockResponse(id, title, startTime, endTime, dayOfWeek, activityType, isCompleted);
            }
        }
    }
}
