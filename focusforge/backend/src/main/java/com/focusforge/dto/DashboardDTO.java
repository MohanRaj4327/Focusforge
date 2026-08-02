package com.focusforge.dto;

import java.util.List;

public class DashboardDTO {

    public static class DailyDashboardResponse {
        private CurrentFocusDTO currentFocus;
        private NextTaskDTO nextTask;
        private int todayProgress;
        private long completedTasks;
        private long totalTasks;
        private int focusMinutes;
        private DsaSummaryDTO dsaSummary;
        private List<RevisionItemDTO> revisionTasks;
        private List<DeadlineSummaryDTO> upcomingDeadlines;
        private List<String> awarenessMessages;
        private StudyStatsDTO studyStats;

        public DailyDashboardResponse() {}

        public DailyDashboardResponse(CurrentFocusDTO currentFocus, NextTaskDTO nextTask, int todayProgress, long completedTasks, long totalTasks, int focusMinutes, DsaSummaryDTO dsaSummary, List<RevisionItemDTO> revisionTasks, List<DeadlineSummaryDTO> upcomingDeadlines, List<String> awarenessMessages, StudyStatsDTO studyStats) {
            this.currentFocus = currentFocus;
            this.nextTask = nextTask;
            this.todayProgress = todayProgress;
            this.completedTasks = completedTasks;
            this.totalTasks = totalTasks;
            this.focusMinutes = focusMinutes;
            this.dsaSummary = dsaSummary;
            this.revisionTasks = revisionTasks;
            this.upcomingDeadlines = upcomingDeadlines;
            this.awarenessMessages = awarenessMessages;
            this.studyStats = studyStats;
        }

        public CurrentFocusDTO getCurrentFocus() { return currentFocus; }
        public void setCurrentFocus(CurrentFocusDTO currentFocus) { this.currentFocus = currentFocus; }
        public NextTaskDTO getNextTask() { return nextTask; }
        public void setNextTask(NextTaskDTO nextTask) { this.nextTask = nextTask; }
        public int getTodayProgress() { return todayProgress; }
        public void setTodayProgress(int todayProgress) { this.todayProgress = todayProgress; }
        public long getCompletedTasks() { return completedTasks; }
        public void setCompletedTasks(long completedTasks) { this.completedTasks = completedTasks; }
        public long getTotalTasks() { return totalTasks; }
        public void setTotalTasks(long totalTasks) { this.totalTasks = totalTasks; }
        public int getFocusMinutes() { return focusMinutes; }
        public void setFocusMinutes(int focusMinutes) { this.focusMinutes = focusMinutes; }
        public DsaSummaryDTO getDsaSummary() { return dsaSummary; }
        public void setDsaSummary(DsaSummaryDTO dsaSummary) { this.dsaSummary = dsaSummary; }
        public List<RevisionItemDTO> getRevisionTasks() { return revisionTasks; }
        public void setRevisionTasks(List<RevisionItemDTO> revisionTasks) { this.revisionTasks = revisionTasks; }
        public List<DeadlineSummaryDTO> getUpcomingDeadlines() { return upcomingDeadlines; }
        public void setUpcomingDeadlines(List<DeadlineSummaryDTO> upcomingDeadlines) { this.upcomingDeadlines = upcomingDeadlines; }
        public List<String> getAwarenessMessages() { return awarenessMessages; }
        public void setAwarenessMessages(List<String> awarenessMessages) { this.awarenessMessages = awarenessMessages; }
        public StudyStatsDTO getStudyStats() { return studyStats; }
        public void setStudyStats(StudyStatsDTO studyStats) { this.studyStats = studyStats; }

        public static DailyDashboardResponseBuilder builder() { return new DailyDashboardResponseBuilder(); }

        public static class DailyDashboardResponseBuilder {
            private CurrentFocusDTO currentFocus;
            private NextTaskDTO nextTask;
            private int todayProgress;
            private long completedTasks;
            private long totalTasks;
            private int focusMinutes;
            private DsaSummaryDTO dsaSummary;
            private List<RevisionItemDTO> revisionTasks;
            private List<DeadlineSummaryDTO> upcomingDeadlines;
            private List<String> awarenessMessages;
            private StudyStatsDTO studyStats;

            public DailyDashboardResponseBuilder currentFocus(CurrentFocusDTO currentFocus) { this.currentFocus = currentFocus; return this; }
            public DailyDashboardResponseBuilder nextTask(NextTaskDTO nextTask) { this.nextTask = nextTask; return this; }
            public DailyDashboardResponseBuilder todayProgress(int todayProgress) { this.todayProgress = todayProgress; return this; }
            public DailyDashboardResponseBuilder completedTasks(long completedTasks) { this.completedTasks = completedTasks; return this; }
            public DailyDashboardResponseBuilder totalTasks(long totalTasks) { this.totalTasks = totalTasks; return this; }
            public DailyDashboardResponseBuilder focusMinutes(int focusMinutes) { this.focusMinutes = focusMinutes; return this; }
            public DailyDashboardResponseBuilder dsaSummary(DsaSummaryDTO dsaSummary) { this.dsaSummary = dsaSummary; return this; }
            public DailyDashboardResponseBuilder revisionTasks(List<RevisionItemDTO> revisionTasks) { this.revisionTasks = revisionTasks; return this; }
            public DailyDashboardResponseBuilder upcomingDeadlines(List<DeadlineSummaryDTO> upcomingDeadlines) { this.upcomingDeadlines = upcomingDeadlines; return this; }
            public DailyDashboardResponseBuilder awarenessMessages(List<String> awarenessMessages) { this.awarenessMessages = awarenessMessages; return this; }
            public DailyDashboardResponseBuilder studyStats(StudyStatsDTO studyStats) { this.studyStats = studyStats; return this; }

            public DailyDashboardResponse build() {
                return new DailyDashboardResponse(currentFocus, nextTask, todayProgress, completedTasks, totalTasks, focusMinutes, dsaSummary, revisionTasks, upcomingDeadlines, awarenessMessages, studyStats);
            }
        }
    }

    public static class CurrentFocusDTO {
        private String title;
        private String startTime;
        private String endTime;
        private String activityType;

        public CurrentFocusDTO() {}

        public CurrentFocusDTO(String title, String startTime, String endTime, String activityType) {
            this.title = title;
            this.startTime = startTime;
            this.endTime = endTime;
            this.activityType = activityType;
        }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getStartTime() { return startTime; }
        public void setStartTime(String startTime) { this.startTime = startTime; }
        public String getEndTime() { return endTime; }
        public void setEndTime(String endTime) { this.endTime = endTime; }
        public String getActivityType() { return activityType; }
        public void setActivityType(String activityType) { this.activityType = activityType; }

        public static CurrentFocusDTOBuilder builder() { return new CurrentFocusDTOBuilder(); }

        public static class CurrentFocusDTOBuilder {
            private String title;
            private String startTime;
            private String endTime;
            private String activityType;

            public CurrentFocusDTOBuilder title(String title) { this.title = title; return this; }
            public CurrentFocusDTOBuilder startTime(String startTime) { this.startTime = startTime; return this; }
            public CurrentFocusDTOBuilder endTime(String endTime) { this.endTime = endTime; return this; }
            public CurrentFocusDTOBuilder activityType(String activityType) { this.activityType = activityType; return this; }

            public CurrentFocusDTO build() {
                return new CurrentFocusDTO(title, startTime, endTime, activityType);
            }
        }
    }

    public static class NextTaskDTO {
        private String title;
        private String startTime;
        private String endTime;
        private String category;

        public NextTaskDTO() {}

        public NextTaskDTO(String title, String startTime, String endTime, String category) {
            this.title = title;
            this.startTime = startTime;
            this.endTime = endTime;
            this.category = category;
        }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getStartTime() { return startTime; }
        public void setStartTime(String startTime) { this.startTime = startTime; }
        public String getEndTime() { return endTime; }
        public void setEndTime(String endTime) { this.endTime = endTime; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public static NextTaskDTOBuilder builder() { return new NextTaskDTOBuilder(); }

        public static class NextTaskDTOBuilder {
            private String title;
            private String startTime;
            private String endTime;
            private String category;

            public NextTaskDTOBuilder title(String title) { this.title = title; return this; }
            public NextTaskDTOBuilder startTime(String startTime) { this.startTime = startTime; return this; }
            public NextTaskDTOBuilder endTime(String endTime) { this.endTime = endTime; return this; }
            public NextTaskDTOBuilder category(String category) { this.category = category; return this; }

            public NextTaskDTO build() {
                return new NextTaskDTO(title, startTime, endTime, category);
            }
        }
    }

    public static class DsaSummaryDTO {
        private int totalProblems;
        private int solvedProblems;
        private int remainingProblems;
        private int progressPercentage;
        private int currentMonth;
        private String currentTopic;
        private int expectedProblems;
        private int problemsBehind;
        private String status;

        public DsaSummaryDTO() {}

        public DsaSummaryDTO(int totalProblems, int solvedProblems, int remainingProblems, int progressPercentage, int currentMonth, String currentTopic, int expectedProblems, int problemsBehind, String status) {
            this.totalProblems = totalProblems;
            this.solvedProblems = solvedProblems;
            this.remainingProblems = remainingProblems;
            this.progressPercentage = progressPercentage;
            this.currentMonth = currentMonth;
            this.currentTopic = currentTopic;
            this.expectedProblems = expectedProblems;
            this.problemsBehind = problemsBehind;
            this.status = status;
        }

        public int getTotalProblems() { return totalProblems; }
        public void setTotalProblems(int totalProblems) { this.totalProblems = totalProblems; }
        public int getSolvedProblems() { return solvedProblems; }
        public void setSolvedProblems(int solvedProblems) { this.solvedProblems = solvedProblems; }
        public int getRemainingProblems() { return remainingProblems; }
        public void setRemainingProblems(int remainingProblems) { this.remainingProblems = remainingProblems; }
        public int getProgressPercentage() { return progressPercentage; }
        public void setProgressPercentage(int progressPercentage) { this.progressPercentage = progressPercentage; }
        public int getCurrentMonth() { return currentMonth; }
        public void setCurrentMonth(int currentMonth) { this.currentMonth = currentMonth; }
        public String getCurrentTopic() { return currentTopic; }
        public void setCurrentTopic(String currentTopic) { this.currentTopic = currentTopic; }
        public int getExpectedProblems() { return expectedProblems; }
        public void setExpectedProblems(int expectedProblems) { this.expectedProblems = expectedProblems; }
        public int getProblemsBehind() { return problemsBehind; }
        public void setProblemsBehind(int problemsBehind) { this.problemsBehind = problemsBehind; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public static DsaSummaryDTOBuilder builder() { return new DsaSummaryDTOBuilder(); }

        public static class DsaSummaryDTOBuilder {
            private int totalProblems;
            private int solvedProblems;
            private int remainingProblems;
            private int progressPercentage;
            private int currentMonth;
            private String currentTopic;
            private int expectedProblems;
            private int problemsBehind;
            private String status;

            public DsaSummaryDTOBuilder totalProblems(int totalProblems) { this.totalProblems = totalProblems; return this; }
            public DsaSummaryDTOBuilder solvedProblems(int solvedProblems) { this.solvedProblems = solvedProblems; return this; }
            public DsaSummaryDTOBuilder remainingProblems(int remainingProblems) { this.remainingProblems = remainingProblems; return this; }
            public DsaSummaryDTOBuilder progressPercentage(int progressPercentage) { this.progressPercentage = progressPercentage; return this; }
            public DsaSummaryDTOBuilder currentMonth(int currentMonth) { this.currentMonth = currentMonth; return this; }
            public DsaSummaryDTOBuilder currentTopic(String currentTopic) { this.currentTopic = currentTopic; return this; }
            public DsaSummaryDTOBuilder expectedProblems(int expectedProblems) { this.expectedProblems = expectedProblems; return this; }
            public DsaSummaryDTOBuilder problemsBehind(int problemsBehind) { this.problemsBehind = problemsBehind; return this; }
            public DsaSummaryDTOBuilder status(String status) { this.status = status; return this; }

            public DsaSummaryDTO build() {
                return new DsaSummaryDTO(totalProblems, solvedProblems, remainingProblems, progressPercentage, currentMonth, currentTopic, expectedProblems, problemsBehind, status);
            }
        }
    }

    public static class RevisionItemDTO {
        private Long id;
        private Long problemId;
        private String problemTitle;
        private String topicName;
        private String difficulty;
        private int revisionStage;
        private String scheduledDate;
        private boolean isCompleted;

        public RevisionItemDTO() {}

        public RevisionItemDTO(Long id, Long problemId, String problemTitle, String topicName, String difficulty, int revisionStage, String scheduledDate, boolean isCompleted) {
            this.id = id;
            this.problemId = problemId;
            this.problemTitle = problemTitle;
            this.topicName = topicName;
            this.difficulty = difficulty;
            this.revisionStage = revisionStage;
            this.scheduledDate = scheduledDate;
            this.isCompleted = isCompleted;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getProblemId() { return problemId; }
        public void setProblemId(Long problemId) { this.problemId = problemId; }
        public String getProblemTitle() { return problemTitle; }
        public void setProblemTitle(String problemTitle) { this.problemTitle = problemTitle; }
        public String getTopicName() { return topicName; }
        public void setTopicName(String topicName) { this.topicName = topicName; }
        public String getDifficulty() { return difficulty; }
        public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
        public int getRevisionStage() { return revisionStage; }
        public void setRevisionStage(int revisionStage) { this.revisionStage = revisionStage; }
        public String getScheduledDate() { return scheduledDate; }
        public void setScheduledDate(String scheduledDate) { this.scheduledDate = scheduledDate; }
        public boolean isCompleted() { return isCompleted; }
        public void setCompleted(boolean isCompleted) { this.isCompleted = isCompleted; }

        public static RevisionItemDTOBuilder builder() { return new RevisionItemDTOBuilder(); }

        public static class RevisionItemDTOBuilder {
            private Long id;
            private Long problemId;
            private String problemTitle;
            private String topicName;
            private String difficulty;
            private int revisionStage;
            private String scheduledDate;
            private boolean isCompleted;

            public RevisionItemDTOBuilder id(Long id) { this.id = id; return this; }
            public RevisionItemDTOBuilder problemId(Long problemId) { this.problemId = problemId; return this; }
            public RevisionItemDTOBuilder problemTitle(String problemTitle) { this.problemTitle = problemTitle; return this; }
            public RevisionItemDTOBuilder topicName(String topicName) { this.topicName = topicName; return this; }
            public RevisionItemDTOBuilder difficulty(String difficulty) { this.difficulty = difficulty; return this; }
            public RevisionItemDTOBuilder revisionStage(int revisionStage) { this.revisionStage = revisionStage; return this; }
            public RevisionItemDTOBuilder scheduledDate(String scheduledDate) { this.scheduledDate = scheduledDate; return this; }
            public RevisionItemDTOBuilder isCompleted(boolean isCompleted) { this.isCompleted = isCompleted; return this; }

            public RevisionItemDTO build() {
                return new RevisionItemDTO(id, problemId, problemTitle, topicName, difficulty, revisionStage, scheduledDate, isCompleted);
            }
        }
    }

    public static class DeadlineSummaryDTO {
        private Long id;
        private String title;
        private String dueDate;
        private String priority;
        private String category;

        public DeadlineSummaryDTO() {}

        public DeadlineSummaryDTO(Long id, String title, String dueDate, String priority, String category) {
            this.id = id;
            this.title = title;
            this.dueDate = dueDate;
            this.priority = priority;
            this.category = category;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDueDate() { return dueDate; }
        public void setDueDate(String dueDate) { this.dueDate = dueDate; }
        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public static DeadlineSummaryDTOBuilder builder() { return new DeadlineSummaryDTOBuilder(); }

        public static class DeadlineSummaryDTOBuilder {
            private Long id;
            private String title;
            private String dueDate;
            private String priority;
            private String category;

            public DeadlineSummaryDTOBuilder id(Long id) { this.id = id; return this; }
            public DeadlineSummaryDTOBuilder title(String title) { this.title = title; return this; }
            public DeadlineSummaryDTOBuilder dueDate(String dueDate) { this.dueDate = dueDate; return this; }
            public DeadlineSummaryDTOBuilder priority(String priority) { this.priority = priority; return this; }
            public DeadlineSummaryDTOBuilder category(String category) { this.category = category; return this; }

            public DeadlineSummaryDTO build() {
                return new DeadlineSummaryDTO(id, title, dueDate, priority, category);
            }
        }
    }

    public static class StudyStatsDTO {
        private int currentStreakDays;
        private int longestStreakDays;
        private int dailyFocusMinutes;
        private int weeklyFocusMinutes;
        private int monthlyFocusMinutes;
        private int totalProblemsSolved;
        private int overallProductivityScore;

        public StudyStatsDTO() {}

        public StudyStatsDTO(int currentStreakDays, int longestStreakDays, int dailyFocusMinutes, int weeklyFocusMinutes, int monthlyFocusMinutes, int totalProblemsSolved, int overallProductivityScore) {
            this.currentStreakDays = currentStreakDays;
            this.longestStreakDays = longestStreakDays;
            this.dailyFocusMinutes = dailyFocusMinutes;
            this.weeklyFocusMinutes = weeklyFocusMinutes;
            this.monthlyFocusMinutes = monthlyFocusMinutes;
            this.totalProblemsSolved = totalProblemsSolved;
            this.overallProductivityScore = overallProductivityScore;
        }

        public int getCurrentStreakDays() { return currentStreakDays; }
        public void setCurrentStreakDays(int currentStreakDays) { this.currentStreakDays = currentStreakDays; }
        public int getLongestStreakDays() { return longestStreakDays; }
        public void setLongestStreakDays(int longestStreakDays) { this.longestStreakDays = longestStreakDays; }
        public int getDailyFocusMinutes() { return dailyFocusMinutes; }
        public void setDailyFocusMinutes(int dailyFocusMinutes) { this.dailyFocusMinutes = dailyFocusMinutes; }
        public int getWeeklyFocusMinutes() { return weeklyFocusMinutes; }
        public void setWeeklyFocusMinutes(int weeklyFocusMinutes) { this.weeklyFocusMinutes = weeklyFocusMinutes; }
        public int getMonthlyFocusMinutes() { return monthlyFocusMinutes; }
        public void setMonthlyFocusMinutes(int monthlyFocusMinutes) { this.monthlyFocusMinutes = monthlyFocusMinutes; }
        public int getTotalProblemsSolved() { return totalProblemsSolved; }
        public void setTotalProblemsSolved(int totalProblemsSolved) { this.totalProblemsSolved = totalProblemsSolved; }
        public int getOverallProductivityScore() { return overallProductivityScore; }
        public void setOverallProductivityScore(int overallProductivityScore) { this.overallProductivityScore = overallProductivityScore; }

        public static StudyStatsDTOBuilder builder() { return new StudyStatsDTOBuilder(); }

        public static class StudyStatsDTOBuilder {
            private int currentStreakDays;
            private int longestStreakDays;
            private int dailyFocusMinutes;
            private int weeklyFocusMinutes;
            private int monthlyFocusMinutes;
            private int totalProblemsSolved;
            private int overallProductivityScore;

            public StudyStatsDTOBuilder currentStreakDays(int currentStreakDays) { this.currentStreakDays = currentStreakDays; return this; }
            public StudyStatsDTOBuilder longestStreakDays(int longestStreakDays) { this.longestStreakDays = longestStreakDays; return this; }
            public StudyStatsDTOBuilder dailyFocusMinutes(int dailyFocusMinutes) { this.dailyFocusMinutes = dailyFocusMinutes; return this; }
            public StudyStatsDTOBuilder weeklyFocusMinutes(int weeklyFocusMinutes) { this.weeklyFocusMinutes = weeklyFocusMinutes; return this; }
            public StudyStatsDTOBuilder monthlyFocusMinutes(int monthlyFocusMinutes) { this.monthlyFocusMinutes = monthlyFocusMinutes; return this; }
            public StudyStatsDTOBuilder totalProblemsSolved(int totalProblemsSolved) { this.totalProblemsSolved = totalProblemsSolved; return this; }
            public StudyStatsDTOBuilder overallProductivityScore(int overallProductivityScore) { this.overallProductivityScore = overallProductivityScore; return this; }

            public StudyStatsDTO build() {
                return new StudyStatsDTO(currentStreakDays, longestStreakDays, dailyFocusMinutes, weeklyFocusMinutes, monthlyFocusMinutes, totalProblemsSolved, overallProductivityScore);
            }
        }
    }
}
