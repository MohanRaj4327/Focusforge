package com.focusforge.dto;

import java.util.List;

public class AnalyticsDTO {

    public static class AnalyticsDashboardResponse {
        private int totalFocusMinutes;
        private int weeklyFocusMinutes;
        private int completedTasksCount;
        private int currentStreakDays;
        private int longestStreakDays;
        private int overallProductivityScore;

        private List<DailyFocusBarDTO> weeklyFocusTrend;
        private List<CategoryDistributionDTO> categoryDistribution;
        private List<DsaProgressChartDTO> dsaProgressDistribution;

        public AnalyticsDashboardResponse() {}

        public AnalyticsDashboardResponse(int totalFocusMinutes, int weeklyFocusMinutes, int completedTasksCount, int currentStreakDays, int longestStreakDays, int overallProductivityScore, List<DailyFocusBarDTO> weeklyFocusTrend, List<CategoryDistributionDTO> categoryDistribution, List<DsaProgressChartDTO> dsaProgressDistribution) {
            this.totalFocusMinutes = totalFocusMinutes;
            this.weeklyFocusMinutes = weeklyFocusMinutes;
            this.completedTasksCount = completedTasksCount;
            this.currentStreakDays = currentStreakDays;
            this.longestStreakDays = longestStreakDays;
            this.overallProductivityScore = overallProductivityScore;
            this.weeklyFocusTrend = weeklyFocusTrend;
            this.categoryDistribution = categoryDistribution;
            this.dsaProgressDistribution = dsaProgressDistribution;
        }

        public int getTotalFocusMinutes() { return totalFocusMinutes; }
        public void setTotalFocusMinutes(int totalFocusMinutes) { this.totalFocusMinutes = totalFocusMinutes; }
        public int getWeeklyFocusMinutes() { return weeklyFocusMinutes; }
        public void setWeeklyFocusMinutes(int weeklyFocusMinutes) { this.weeklyFocusMinutes = weeklyFocusMinutes; }
        public int getCompletedTasksCount() { return completedTasksCount; }
        public void setCompletedTasksCount(int completedTasksCount) { this.completedTasksCount = completedTasksCount; }
        public int getCurrentStreakDays() { return currentStreakDays; }
        public void setCurrentStreakDays(int currentStreakDays) { this.currentStreakDays = currentStreakDays; }
        public int getLongestStreakDays() { return longestStreakDays; }
        public void setLongestStreakDays(int longestStreakDays) { this.longestStreakDays = longestStreakDays; }
        public int getOverallProductivityScore() { return overallProductivityScore; }
        public void setOverallProductivityScore(int overallProductivityScore) { this.overallProductivityScore = overallProductivityScore; }
        public List<DailyFocusBarDTO> getWeeklyFocusTrend() { return weeklyFocusTrend; }
        public void setWeeklyFocusTrend(List<DailyFocusBarDTO> weeklyFocusTrend) { this.weeklyFocusTrend = weeklyFocusTrend; }
        public List<CategoryDistributionDTO> getCategoryDistribution() { return categoryDistribution; }
        public void setCategoryDistribution(List<CategoryDistributionDTO> categoryDistribution) { this.categoryDistribution = categoryDistribution; }
        public List<DsaProgressChartDTO> getDsaProgressDistribution() { return dsaProgressDistribution; }
        public void setDsaProgressDistribution(List<DsaProgressChartDTO> dsaProgressDistribution) { this.dsaProgressDistribution = dsaProgressDistribution; }

        public static AnalyticsDashboardResponseBuilder builder() { return new AnalyticsDashboardResponseBuilder(); }

        public static class AnalyticsDashboardResponseBuilder {
            private int totalFocusMinutes;
            private int weeklyFocusMinutes;
            private int completedTasksCount;
            private int currentStreakDays;
            private int longestStreakDays;
            private int overallProductivityScore;
            private List<DailyFocusBarDTO> weeklyFocusTrend;
            private List<CategoryDistributionDTO> categoryDistribution;
            private List<DsaProgressChartDTO> dsaProgressDistribution;

            public AnalyticsDashboardResponseBuilder totalFocusMinutes(int totalFocusMinutes) { this.totalFocusMinutes = totalFocusMinutes; return this; }
            public AnalyticsDashboardResponseBuilder weeklyFocusMinutes(int weeklyFocusMinutes) { this.weeklyFocusMinutes = weeklyFocusMinutes; return this; }
            public AnalyticsDashboardResponseBuilder completedTasksCount(int completedTasksCount) { this.completedTasksCount = completedTasksCount; return this; }
            public AnalyticsDashboardResponseBuilder currentStreakDays(int currentStreakDays) { this.currentStreakDays = currentStreakDays; return this; }
            public AnalyticsDashboardResponseBuilder longestStreakDays(int longestStreakDays) { this.longestStreakDays = longestStreakDays; return this; }
            public AnalyticsDashboardResponseBuilder overallProductivityScore(int overallProductivityScore) { this.overallProductivityScore = overallProductivityScore; return this; }
            public AnalyticsDashboardResponseBuilder weeklyFocusTrend(List<DailyFocusBarDTO> weeklyFocusTrend) { this.weeklyFocusTrend = weeklyFocusTrend; return this; }
            public AnalyticsDashboardResponseBuilder categoryDistribution(List<CategoryDistributionDTO> categoryDistribution) { this.categoryDistribution = categoryDistribution; return this; }
            public AnalyticsDashboardResponseBuilder dsaProgressDistribution(List<DsaProgressChartDTO> dsaProgressDistribution) { this.dsaProgressDistribution = dsaProgressDistribution; return this; }

            public AnalyticsDashboardResponse build() {
                return new AnalyticsDashboardResponse(totalFocusMinutes, weeklyFocusMinutes, completedTasksCount, currentStreakDays, longestStreakDays, overallProductivityScore, weeklyFocusTrend, categoryDistribution, dsaProgressDistribution);
            }
        }
    }

    public static class DailyFocusBarDTO {
        private String day;
        private int minutes;

        public DailyFocusBarDTO() {}

        public DailyFocusBarDTO(String day, int minutes) {
            this.day = day;
            this.minutes = minutes;
        }

        public String getDay() { return day; }
        public void setDay(String day) { this.day = day; }
        public int getMinutes() { return minutes; }
        public void setMinutes(int minutes) { this.minutes = minutes; }

        public static DailyFocusBarDTOBuilder builder() { return new DailyFocusBarDTOBuilder(); }

        public static class DailyFocusBarDTOBuilder {
            private String day;
            private int minutes;

            public DailyFocusBarDTOBuilder day(String day) { this.day = day; return this; }
            public DailyFocusBarDTOBuilder minutes(int minutes) { this.minutes = minutes; return this; }

            public DailyFocusBarDTO build() {
                return new DailyFocusBarDTO(day, minutes);
            }
        }
    }

    public static class CategoryDistributionDTO {
        private String name;
        private int minutes;
        private String color;

        public CategoryDistributionDTO() {}

        public CategoryDistributionDTO(String name, int minutes, String color) {
            this.name = name;
            this.minutes = minutes;
            this.color = color;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public int getMinutes() { return minutes; }
        public void setMinutes(int minutes) { this.minutes = minutes; }
        public String getColor() { return color; }
        public void setColor(String color) { this.color = color; }

        public static CategoryDistributionDTOBuilder builder() { return new CategoryDistributionDTOBuilder(); }

        public static class CategoryDistributionDTOBuilder {
            private String name;
            private int minutes;
            private String color;

            public CategoryDistributionDTOBuilder name(String name) { this.name = name; return this; }
            public CategoryDistributionDTOBuilder minutes(int minutes) { this.minutes = minutes; return this; }
            public CategoryDistributionDTOBuilder color(String color) { this.color = color; return this; }

            public CategoryDistributionDTO build() {
                return new CategoryDistributionDTO(name, minutes, color);
            }
        }
    }

    public static class DsaProgressChartDTO {
        private String month;
        private int solved;
        private int target;

        public DsaProgressChartDTO() {}

        public DsaProgressChartDTO(String month, int solved, int target) {
            this.month = month;
            this.solved = solved;
            this.target = target;
        }

        public String getMonth() { return month; }
        public void setMonth(String month) { this.month = month; }
        public int getSolved() { return solved; }
        public void setSolved(int solved) { this.solved = solved; }
        public int getTarget() { return target; }
        public void setTarget(int target) { this.target = target; }

        public static DsaProgressChartDTOBuilder builder() { return new DsaProgressChartDTOBuilder(); }

        public static class DsaProgressChartDTOBuilder {
            private String month;
            private int solved;
            private int target;

            public DsaProgressChartDTOBuilder month(String month) { this.month = month; return this; }
            public DsaProgressChartDTOBuilder solved(int solved) { this.solved = solved; return this; }
            public DsaProgressChartDTOBuilder target(int target) { this.target = target; return this; }

            public DsaProgressChartDTO build() {
                return new DsaProgressChartDTO(month, solved, target);
            }
        }
    }
}
