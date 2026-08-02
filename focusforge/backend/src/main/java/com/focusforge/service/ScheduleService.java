package com.focusforge.service;

import com.focusforge.dto.ScheduleDTO;
import com.focusforge.entity.ScheduleBlock;
import com.focusforge.entity.User;
import com.focusforge.exception.ResourceNotFoundException;
import com.focusforge.repository.ScheduleBlockRepository;
import com.focusforge.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

    private final ScheduleBlockRepository scheduleRepository;
    private final UserRepository userRepository;

    public ScheduleService(ScheduleBlockRepository scheduleRepository, UserRepository userRepository) {
        this.scheduleRepository = scheduleRepository;
        this.userRepository = userRepository;
    }

    public List<ScheduleDTO.ScheduleBlockResponse> getTodaySchedule(Long userId) {
        String todayDay = LocalDate.now().getDayOfWeek().name();
        List<ScheduleBlock> blocks = scheduleRepository.findByUserIdOrderByStartTimeAsc(userId);

        return blocks.stream()
                .filter(b -> "ALL".equalsIgnoreCase(b.getDayOfWeek()) || todayDay.equalsIgnoreCase(b.getDayOfWeek()))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ScheduleDTO.ScheduleBlockResponse> getWeekSchedule(Long userId) {
        return scheduleRepository.findByUserIdOrderByStartTimeAsc(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ScheduleDTO.ScheduleBlockResponse createScheduleBlock(Long userId, ScheduleDTO.ScheduleBlockRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        ScheduleBlock block = ScheduleBlock.builder()
                .user(user)
                .title(request.getTitle())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .dayOfWeek(request.getDayOfWeek() != null ? request.getDayOfWeek() : "ALL")
                .activityType(request.getActivityType() != null ? request.getActivityType() : "STUDY")
                .isCompleted(false)
                .build();

        return mapToResponse(scheduleRepository.save(block));
    }

    @Transactional
    public ScheduleDTO.ScheduleBlockResponse updateScheduleBlock(Long userId, Long id, ScheduleDTO.ScheduleBlockRequest request) {
        ScheduleBlock block = scheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule block not found with ID: " + id));

        if (!block.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Unauthorized access to schedule block");
        }

        if (request.getTitle() != null) block.setTitle(request.getTitle());
        if (request.getStartTime() != null) block.setStartTime(request.getStartTime());
        if (request.getEndTime() != null) block.setEndTime(request.getEndTime());
        if (request.getDayOfWeek() != null) block.setDayOfWeek(request.getDayOfWeek());
        if (request.getActivityType() != null) block.setActivityType(request.getActivityType());
        if (request.getIsCompleted() != null) block.setIsCompleted(request.getIsCompleted());

        return mapToResponse(scheduleRepository.save(block));
    }

    @Transactional
    public void deleteScheduleBlock(Long userId, Long id) {
        ScheduleBlock block = scheduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Schedule block not found with ID: " + id));

        if (!block.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Unauthorized access to schedule block");
        }

        scheduleRepository.delete(block);
    }

    private ScheduleDTO.ScheduleBlockResponse mapToResponse(ScheduleBlock block) {
        return ScheduleDTO.ScheduleBlockResponse.builder()
                .id(block.getId())
                .title(block.getTitle())
                .startTime(block.getStartTime())
                .endTime(block.getEndTime())
                .dayOfWeek(block.getDayOfWeek())
                .activityType(block.getActivityType())
                .isCompleted(block.getIsCompleted())
                .build();
    }
}
