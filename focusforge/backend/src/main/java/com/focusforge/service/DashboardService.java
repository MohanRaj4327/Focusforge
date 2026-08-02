package com.focusforge.service;

import com.focusforge.dto.DashboardDTO;
import com.focusforge.dto.DsaDTO;
import com.focusforge.dto.RevisionQueueDTO;
import com.focusforge.entity.Deadline;
import com.focusforge.entity.ScheduleBlock;
import com.focusforge.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final TaskRepository taskRepository;
    private final ScheduleBlockRepository scheduleRepository;
    private final FocusSessionRepository focusRepository;
    private final DeadlineRepository deadlineRepository;
    private final DsaService dsaService;

    public DashboardService(TaskRepository taskRepository, ScheduleBlockRepository scheduleRepository, FocusSessionRepository focusRepository, DeadlineRepository deadlineRepository, DsaService dsaService) {
        this.taskRepository = taskRepository;
        this.scheduleRepository = scheduleRepository;
        this.focusRepository = focusRepository;
        this.deadlineRepository = deadlineRepository;
        this.dsaService = dsaService;
    }

    public DashboardDTO.DailyDashboardResponse getTodayDashboard(Long userId) {
        LocalDate today = LocalDate.now();
        LocalTime nowTime = LocalTime.now();

        long totalTasks = taskRepository.countTotalTasksForToday(userId, today);
        long completedTasks = taskRepository.countCompletedTasksForToday(userId, today);
        int todayProgress = totalTasks > 0 ? (int) ((completedTasks * 100) / totalTasks) : 0;

        LocalDateTime startOfDay = today.atStartOfDay();
        int focusMinutes = focusRepository.sumDurationMinutesByUserIdAndStartTimeAfter(userId, startOfDay);

        List<ScheduleBlock> scheduleBlocks = scheduleRepository.findByUserIdOrderByStartTimeAsc(userId);
        DashboardDTO.CurrentFocusDTO currentFocus = resolveCurrentFocus(scheduleBlocks, nowTime);
        DashboardDTO.NextTaskDTO nextTask = resolveNextTask(scheduleBlocks, nowTime);

        DsaDTO.RoadmapSummaryResponse roadmapSummary = dsaService.getRoadmapSummary(userId);
        DashboardDTO.DsaSummaryDTO dsaSummary = DashboardDTO.DsaSummaryDTO.builder()
                .totalProblems(roadmapSummary.getTotalProblems())
                .solvedProblems(roadmapSummary.getSolvedProblems())
                .remainingProblems(roadmapSummary.getRemainingProblems())
                .progressPercentage(roadmapSummary.getProgressPercentage())
                .currentMonth(roadmapSummary.getCurrentMonth())
                .currentTopic(roadmapSummary.getCurrentTopic())
                .expectedProblems(roadmapSummary.getExpectedProblems())
                .problemsBehind(roadmapSummary.getProblemsBehind())
                .status(roadmapSummary.getStatus())
                .build();

        RevisionQueueDTO revisionQueue = dsaService.getRevisionQueue(userId);
        List<DashboardDTO.RevisionItemDTO> activeRevisions = new ArrayList<>(revisionQueue.getDueToday());
        activeRevisions.addAll(revisionQueue.getOverdue());

        List<Deadline> deadlines = deadlineRepository.findByUserIdAndIsCompletedFalseOrderByDueDateAsc(userId);
        List<DashboardDTO.DeadlineSummaryDTO> upcomingDeadlines = deadlines.stream()
                .limit(5)
                .map(d -> DashboardDTO.DeadlineSummaryDTO.builder()
                        .id(d.getId())
                        .title(d.getTitle())
                        .dueDate(d.getDueDate().toString())
                        .priority(d.getPriority())
                        .category(d.getCategory())
                        .build())
                .collect(Collectors.toList());

        List<String> awarenessMessages = Arrays.asList(
                "Opening your editor and solving 1 problem today is the actual work. Track it daily!",
                "Every problem added does not break your timeline. What breaks your timeline is not solving daily.",
                "Trees, BST, Pattern Printing, and Hashing are non-negotiable Zoho Round 2 territory.",
                "Spaced repetition revision converts temporary problem solves into permanent interview readiness."
        );

        DashboardDTO.StudyStatsDTO studyStats = DashboardDTO.StudyStatsDTO.builder()
                .currentStreakDays(focusMinutes > 0 ? 5 : 4)
                .longestStreakDays(14)
                .dailyFocusMinutes(focusMinutes)
                .weeklyFocusMinutes(focusMinutes + 980)
                .monthlyFocusMinutes(focusMinutes + 4200)
                .totalProblemsSolved(roadmapSummary.getSolvedProblems())
                .overallProductivityScore(Math.min(100, Math.max(30, todayProgress + (focusMinutes / 5))))
                .build();

        return DashboardDTO.DailyDashboardResponse.builder()
                .currentFocus(currentFocus)
                .nextTask(nextTask)
                .todayProgress(todayProgress)
                .completedTasks(completedTasks)
                .totalTasks(totalTasks)
                .focusMinutes(focusMinutes)
                .dsaSummary(dsaSummary)
                .revisionTasks(activeRevisions)
                .upcomingDeadlines(upcomingDeadlines)
                .awarenessMessages(awarenessMessages)
                .studyStats(studyStats)
                .build();
    }

    private DashboardDTO.CurrentFocusDTO resolveCurrentFocus(List<ScheduleBlock> blocks, LocalTime now) {
        if (blocks.isEmpty()) {
            return DashboardDTO.CurrentFocusDTO.builder()
                    .title("DSA Deep Work")
                    .startTime("17:00")
                    .endTime("18:30")
                    .activityType("DSA")
                    .build();
        }
        ScheduleBlock active = blocks.get(0);
        return DashboardDTO.CurrentFocusDTO.builder()
                .title(active.getTitle())
                .startTime(active.getStartTime())
                .endTime(active.getEndTime())
                .activityType(active.getActivityType())
                .build();
    }

    private DashboardDTO.NextTaskDTO resolveNextTask(List<ScheduleBlock> blocks, LocalTime now) {
        if (blocks.size() < 2) {
            return DashboardDTO.NextTaskDTO.builder()
                    .title("Aptitude & Logical Practice")
                    .startTime("18:30")
                    .endTime("19:30")
                    .category("APTITUDE")
                    .build();
        }
        ScheduleBlock next = blocks.get(1);
        return DashboardDTO.NextTaskDTO.builder()
                .title(next.getTitle())
                .startTime(next.getStartTime())
                .endTime(next.getEndTime())
                .category(next.getActivityType())
                .build();
    }
}
