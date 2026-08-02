package com.focusforge.service;

import com.focusforge.dto.AnalyticsDTO;
import com.focusforge.repository.FocusSessionRepository;
import com.focusforge.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class AnalyticsService {

    private final FocusSessionRepository focusRepository;
    private final TaskRepository taskRepository;
    private final DsaService dsaService;

    public AnalyticsService(FocusSessionRepository focusRepository, TaskRepository taskRepository, DsaService dsaService) {
        this.focusRepository = focusRepository;
        this.taskRepository = taskRepository;
        this.dsaService = dsaService;
    }

    public AnalyticsDTO.AnalyticsDashboardResponse getAnalyticsDashboard(Long userId) {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime startOfWeek = startOfDay.minusDays(7);

        int todayMinutes = focusRepository.sumDurationMinutesByUserIdAndStartTimeAfter(userId, startOfDay);
        int weeklyMinutes = focusRepository.sumDurationMinutesByUserIdAndStartTimeAfter(userId, startOfWeek);
        long completedTasks = taskRepository.countCompletedTasksForToday(userId, LocalDate.now());

        List<AnalyticsDTO.DailyFocusBarDTO> weeklyTrend = new ArrayList<>();
        String[] days = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};
        int[] dummyMinutes = {180, 240, 210, 300, 270, 150, todayMinutes};

        for (int i = 0; i < days.length; i++) {
            weeklyTrend.add(AnalyticsDTO.DailyFocusBarDTO.builder()
                    .day(days[i])
                    .minutes(dummyMinutes[i])
                    .build());
        }

        List<AnalyticsDTO.CategoryDistributionDTO> taskCategories = Arrays.asList(
                AnalyticsDTO.CategoryDistributionDTO.builder().name("DSA Practice").minutes(350).color("#6366f1").build(),
                AnalyticsDTO.CategoryDistributionDTO.builder().name("Aptitude").minutes(150).color("#10b981").build(),
                AnalyticsDTO.CategoryDistributionDTO.builder().name("Academic Prep").minutes(120).color("#f59e0b").build(),
                AnalyticsDTO.CategoryDistributionDTO.builder().name("System Design").minutes(90).color("#ec4899").build()
        );

        List<AnalyticsDTO.DsaProgressChartDTO> dsaMonthlyProgress = Arrays.asList(
                AnalyticsDTO.DsaProgressChartDTO.builder().month("Month 1").solved(30).target(30).build(),
                AnalyticsDTO.DsaProgressChartDTO.builder().month("Month 2").solved(28).target(30).build(),
                AnalyticsDTO.DsaProgressChartDTO.builder().month("Month 3").solved(15).target(30).build(),
                AnalyticsDTO.DsaProgressChartDTO.builder().month("Month 4").solved(0).target(30).build(),
                AnalyticsDTO.DsaProgressChartDTO.builder().month("Month 5").solved(0).target(30).build(),
                AnalyticsDTO.DsaProgressChartDTO.builder().month("Month 6").solved(0).target(25).build()
        );

        return AnalyticsDTO.AnalyticsDashboardResponse.builder()
                .totalFocusMinutes(weeklyMinutes + 1200)
                .weeklyFocusMinutes(weeklyMinutes)
                .completedTasksCount((int) completedTasks)
                .currentStreakDays(5)
                .longestStreakDays(14)
                .overallProductivityScore(88)
                .weeklyFocusTrend(weeklyTrend)
                .categoryDistribution(taskCategories)
                .dsaProgressDistribution(dsaMonthlyProgress)
                .build();
    }
}
