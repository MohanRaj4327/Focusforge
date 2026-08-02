package com.focusforge.service;

import com.focusforge.dto.DeadlineDTO;
import com.focusforge.entity.Deadline;
import com.focusforge.entity.User;
import com.focusforge.exception.ResourceNotFoundException;
import com.focusforge.repository.DeadlineRepository;
import com.focusforge.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeadlineService {

    private final DeadlineRepository deadlineRepository;
    private final UserRepository userRepository;

    public DeadlineService(DeadlineRepository deadlineRepository, UserRepository userRepository) {
        this.deadlineRepository = deadlineRepository;
        this.userRepository = userRepository;
    }

    public List<DeadlineDTO.DeadlineResponse> getAllDeadlines(Long userId) {
        return deadlineRepository.findByUserIdOrderByDueDateAsc(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public DeadlineDTO.DeadlineResponse createDeadline(Long userId, DeadlineDTO.DeadlineRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Deadline deadline = Deadline.builder()
                .user(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .priority(request.getPriority() != null ? request.getPriority() : "HIGH")
                .category(request.getCategory() != null ? request.getCategory() : "ACADEMIC")
                .isCompleted(false)
                .build();

        return mapToResponse(deadlineRepository.save(deadline));
    }

    @Transactional
    public DeadlineDTO.DeadlineResponse updateDeadline(Long userId, Long id, DeadlineDTO.DeadlineRequest request) {
        Deadline deadline = deadlineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Deadline not found with ID: " + id));

        if (!deadline.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Unauthorized access to deadline");
        }

        if (request.getTitle() != null) deadline.setTitle(request.getTitle());
        if (request.getDescription() != null) deadline.setDescription(request.getDescription());
        if (request.getDueDate() != null) deadline.setDueDate(request.getDueDate());
        if (request.getPriority() != null) deadline.setPriority(request.getPriority());
        if (request.getCategory() != null) deadline.setCategory(request.getCategory());
        if (request.getIsCompleted() != null) deadline.setIsCompleted(request.getIsCompleted());

        return mapToResponse(deadlineRepository.save(deadline));
    }

    @Transactional
    public void deleteDeadline(Long userId, Long id) {
        Deadline deadline = deadlineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Deadline not found with ID: " + id));

        if (!deadline.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Unauthorized access to deadline");
        }

        deadlineRepository.delete(deadline);
    }

    private DeadlineDTO.DeadlineResponse mapToResponse(Deadline deadline) {
        return DeadlineDTO.DeadlineResponse.builder()
                .id(deadline.getId())
                .title(deadline.getTitle())
                .description(deadline.getDescription())
                .dueDate(deadline.getDueDate())
                .priority(deadline.getPriority())
                .category(deadline.getCategory())
                .isCompleted(deadline.getIsCompleted())
                .build();
    }
}
