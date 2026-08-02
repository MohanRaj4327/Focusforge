package com.focusforge.dto;

import java.time.LocalDateTime;

public class FocusSessionDTO {

    public static class StartSessionRequest {
        private Long taskId;
        private Long dsaProblemId;
        private Integer durationMinutes;
        private String sessionType;

        public StartSessionRequest() {}

        public StartSessionRequest(Long taskId, Long dsaProblemId, Integer durationMinutes, String sessionType) {
            this.taskId = taskId;
            this.dsaProblemId = dsaProblemId;
            this.durationMinutes = durationMinutes;
            this.sessionType = sessionType;
        }

        public Long getTaskId() { return taskId; }
        public void setTaskId(Long taskId) { this.taskId = taskId; }
        public Long getDsaProblemId() { return dsaProblemId; }
        public void setDsaProblemId(Long dsaProblemId) { this.dsaProblemId = dsaProblemId; }
        public Integer getDurationMinutes() { return durationMinutes; }
        public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
        public String getSessionType() { return sessionType; }
        public void setSessionType(String sessionType) { this.sessionType = sessionType; }
    }

    public static class SessionResponse {
        private Long id;
        private Long taskId;
        private String taskTitle;
        private Long dsaProblemId;
        private String dsaProblemTitle;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private Integer durationMinutes;
        private String sessionType;
        private Boolean completed;

        public SessionResponse() {}

        public SessionResponse(Long id, Long taskId, String taskTitle, Long dsaProblemId, String dsaProblemTitle, LocalDateTime startTime, LocalDateTime endTime, Integer durationMinutes, String sessionType, Boolean completed) {
            this.id = id;
            this.taskId = taskId;
            this.taskTitle = taskTitle;
            this.dsaProblemId = dsaProblemId;
            this.dsaProblemTitle = dsaProblemTitle;
            this.startTime = startTime;
            this.endTime = endTime;
            this.durationMinutes = durationMinutes;
            this.sessionType = sessionType;
            this.completed = completed;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getTaskId() { return taskId; }
        public void setTaskId(Long taskId) { this.taskId = taskId; }
        public String getTaskTitle() { return taskTitle; }
        public void setTaskTitle(String taskTitle) { this.taskTitle = taskTitle; }
        public Long getDsaProblemId() { return dsaProblemId; }
        public void setDsaProblemId(Long dsaProblemId) { this.dsaProblemId = dsaProblemId; }
        public String getDsaProblemTitle() { return dsaProblemTitle; }
        public void setDsaProblemTitle(String dsaProblemTitle) { this.dsaProblemTitle = dsaProblemTitle; }
        public LocalDateTime getStartTime() { return startTime; }
        public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
        public LocalDateTime getEndTime() { return endTime; }
        public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
        public Integer getDurationMinutes() { return durationMinutes; }
        public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
        public String getSessionType() { return sessionType; }
        public void setSessionType(String sessionType) { this.sessionType = sessionType; }
        public Boolean getCompleted() { return completed; }
        public void setCompleted(Boolean completed) { this.completed = completed; }

        public static SessionResponseBuilder builder() { return new SessionResponseBuilder(); }

        public static class SessionResponseBuilder {
            private Long id;
            private Long taskId;
            private String taskTitle;
            private Long dsaProblemId;
            private String dsaProblemTitle;
            private LocalDateTime startTime;
            private LocalDateTime endTime;
            private Integer durationMinutes;
            private String sessionType;
            private Boolean completed;

            public SessionResponseBuilder id(Long id) { this.id = id; return this; }
            public SessionResponseBuilder taskId(Long taskId) { this.taskId = taskId; return this; }
            public SessionResponseBuilder taskTitle(String taskTitle) { this.taskTitle = taskTitle; return this; }
            public SessionResponseBuilder dsaProblemId(Long dsaProblemId) { this.dsaProblemId = dsaProblemId; return this; }
            public SessionResponseBuilder dsaProblemTitle(String dsaProblemTitle) { this.dsaProblemTitle = dsaProblemTitle; return this; }
            public SessionResponseBuilder startTime(LocalDateTime startTime) { this.startTime = startTime; return this; }
            public SessionResponseBuilder endTime(LocalDateTime endTime) { this.endTime = endTime; return this; }
            public SessionResponseBuilder durationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; return this; }
            public SessionResponseBuilder sessionType(String sessionType) { this.sessionType = sessionType; return this; }
            public SessionResponseBuilder completed(Boolean completed) { this.completed = completed; return this; }

            public SessionResponse build() {
                return new SessionResponse(id, taskId, taskTitle, dsaProblemId, dsaProblemTitle, startTime, endTime, durationMinutes, sessionType, completed);
            }
        }
    }

    public static class FocusStatisticsResponse {
        private int todayFocusMinutes;
        private int weeklyFocusMinutes;
        private int monthlyFocusMinutes;
        private int totalCompletedSessions;
        private int currentStreakDays;

        public FocusStatisticsResponse() {}

        public FocusStatisticsResponse(int todayFocusMinutes, int weeklyFocusMinutes, int monthlyFocusMinutes, int totalCompletedSessions, int currentStreakDays) {
            this.todayFocusMinutes = todayFocusMinutes;
            this.weeklyFocusMinutes = weeklyFocusMinutes;
            this.monthlyFocusMinutes = monthlyFocusMinutes;
            this.totalCompletedSessions = totalCompletedSessions;
            this.currentStreakDays = currentStreakDays;
        }

        public int getTodayFocusMinutes() { return todayFocusMinutes; }
        public void setTodayFocusMinutes(int todayFocusMinutes) { this.todayFocusMinutes = todayFocusMinutes; }
        public int getWeeklyFocusMinutes() { return weeklyFocusMinutes; }
        public void setWeeklyFocusMinutes(int weeklyFocusMinutes) { this.weeklyFocusMinutes = weeklyFocusMinutes; }
        public int getMonthlyFocusMinutes() { return monthlyFocusMinutes; }
        public void setMonthlyFocusMinutes(int monthlyFocusMinutes) { this.monthlyFocusMinutes = monthlyFocusMinutes; }
        public int getTotalCompletedSessions() { return totalCompletedSessions; }
        public void setTotalCompletedSessions(int totalCompletedSessions) { this.totalCompletedSessions = totalCompletedSessions; }
        public int getCurrentStreakDays() { return currentStreakDays; }
        public void setCurrentStreakDays(int currentStreakDays) { this.currentStreakDays = currentStreakDays; }

        public static FocusStatisticsResponseBuilder builder() { return new FocusStatisticsResponseBuilder(); }

        public static class FocusStatisticsResponseBuilder {
            private int todayFocusMinutes;
            private int weeklyFocusMinutes;
            private int monthlyFocusMinutes;
            private int totalCompletedSessions;
            private int currentStreakDays;

            public FocusStatisticsResponseBuilder todayFocusMinutes(int todayFocusMinutes) { this.todayFocusMinutes = todayFocusMinutes; return this; }
            public FocusStatisticsResponseBuilder weeklyFocusMinutes(int weeklyFocusMinutes) { this.weeklyFocusMinutes = weeklyFocusMinutes; return this; }
            public FocusStatisticsResponseBuilder monthlyFocusMinutes(int monthlyFocusMinutes) { this.monthlyFocusMinutes = monthlyFocusMinutes; return this; }
            public FocusStatisticsResponseBuilder totalCompletedSessions(int totalCompletedSessions) { this.totalCompletedSessions = totalCompletedSessions; return this; }
            public FocusStatisticsResponseBuilder currentStreakDays(int currentStreakDays) { this.currentStreakDays = currentStreakDays; return this; }

            public FocusStatisticsResponse build() {
                return new FocusStatisticsResponse(todayFocusMinutes, weeklyFocusMinutes, monthlyFocusMinutes, totalCompletedSessions, currentStreakDays);
            }
        }
    }
}
