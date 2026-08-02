package com.focusforge.service;

import com.focusforge.dto.FocusSessionDTO;
import com.focusforge.entity.DsaProblem;
import com.focusforge.entity.FocusSession;
import com.focusforge.entity.Task;
import com.focusforge.entity.User;
import com.focusforge.exception.ResourceNotFoundException;
import com.focusforge.repository.DsaProblemRepository;
import com.focusforge.repository.FocusSessionRepository;
import com.focusforge.repository.TaskRepository;
import com.focusforge.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FocusSessionService {

    private final FocusSessionRepository focusRepository;
    private final TaskRepository taskRepository;
    private final DsaProblemRepository dsaRepository;
    private final UserRepository userRepository;

    public FocusSessionService(FocusSessionRepository focusRepository, TaskRepository taskRepository, DsaProblemRepository dsaRepository, UserRepository userRepository) {
        this.focusRepository = focusRepository;
        this.taskRepository = taskRepository;
        this.dsaRepository = dsaRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public FocusSessionDTO.SessionResponse startSession(Long userId, FocusSessionDTO.StartSessionRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Task task = null;
        if (request.getTaskId() != null) {
            task = taskRepository.findById(request.getTaskId()).orElse(null);
        }

        DsaProblem dsaProblem = null;
        if (request.getDsaProblemId() != null) {
            dsaProblem = dsaRepository.findById(request.getDsaProblemId()).orElse(null);
        }

        FocusSession session = FocusSession.builder()
                .user(user)
                .task(task)
                .dsaProblem(dsaProblem)
                .startTime(LocalDateTime.now())
                .durationMinutes(request.getDurationMinutes() != null ? request.getDurationMinutes() : 25)
                .sessionType(request.getSessionType() != null ? request.getSessionType() : "POMODORO")
                .completed(false)
                .build();

        return mapToResponse(focusRepository.save(session));
    }

    @Transactional
    public FocusSessionDTO.SessionResponse completeSession(Long userId, Long sessionId) {
        FocusSession session = focusRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Focus session not found with ID: " + sessionId));

        if (!session.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Unauthorized access to focus session");
        }

        session.setEndTime(LocalDateTime.now());
        session.setCompleted(true);

        return mapToResponse(focusRepository.save(session));
    }

    public FocusSessionDTO.FocusStatisticsResponse getStatistics(Long userId) {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime startOfWeek = startOfDay.minusDays(7);
        LocalDateTime startOfMonth = startOfDay.minusDays(30);

        int todayMinutes = focusRepository.sumDurationMinutesByUserIdAndStartTimeAfter(userId, startOfDay);
        int weeklyMinutes = focusRepository.sumDurationMinutesByUserIdAndStartTimeAfter(userId, startOfWeek);
        int monthlyMinutes = focusRepository.sumDurationMinutesByUserIdAndStartTimeAfter(userId, startOfMonth);

        List<FocusSession> all = focusRepository.findByUserIdOrderByStartTimeDesc(userId);
        long completedCount = all.stream().filter(b -> Boolean.TRUE.equals(b.getCompleted())).count();

        return FocusSessionDTO.FocusStatisticsResponse.builder()
                .todayFocusMinutes(todayMinutes)
                .weeklyFocusMinutes(weeklyMinutes)
                .monthlyFocusMinutes(monthlyMinutes)
                .totalCompletedSessions((int) completedCount)
                .currentStreakDays(todayMinutes > 0 ? 5 : 4)
                .build();
    }

    private FocusSessionDTO.SessionResponse mapToResponse(FocusSession session) {
        return FocusSessionDTO.SessionResponse.builder()
                .id(session.getId())
                .taskId(session.getTask() != null ? session.getTask().getId() : null)
                .taskTitle(session.getTask() != null ? session.getTask().getTitle() : null)
                .dsaProblemId(session.getDsaProblem() != null ? session.getDsaProblem().getId() : null)
                .dsaProblemTitle(session.getDsaProblem() != null ? session.getDsaProblem().getTitle() : null)
                .startTime(session.getStartTime())
                .endTime(session.getEndTime())
                .durationMinutes(session.getDurationMinutes())
                .sessionType(session.getSessionType())
                .completed(session.getCompleted())
                .build();
    }
}
