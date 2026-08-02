package com.focusforge.service;

import com.focusforge.dto.TaskDTO;
import com.focusforge.entity.Task;
import com.focusforge.entity.TaskCategory;
import com.focusforge.entity.User;
import com.focusforge.exception.ResourceNotFoundException;
import com.focusforge.repository.TaskCategoryRepository;
import com.focusforge.repository.TaskRepository;
import com.focusforge.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskCategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, TaskCategoryRepository categoryRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public List<TaskDTO.TaskResponse> getAllTasks(Long userId) {
        return taskRepository.findByUserIdOrderByDueDateAsc(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<TaskDTO.TaskResponse> getTodayTasks(Long userId) {
        return taskRepository.findByUserIdAndDueDate(userId, LocalDate.now()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public TaskDTO.TaskResponse createTask(Long userId, TaskDTO.TaskRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        TaskCategory category = null;
        if (request.getCategoryId() != null) {
            category = categoryRepository.findById(request.getCategoryId()).orElse(null);
        }

        Task task = Task.builder()
                .user(user)
                .category(category)
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority() != null ? request.getPriority() : "MEDIUM")
                .status(request.getStatus() != null ? request.getStatus() : "PENDING")
                .dueDate(request.getDueDate() != null ? request.getDueDate() : LocalDate.now())
                .estimatedMinutes(request.getEstimatedMinutes() != null ? request.getEstimatedMinutes() : 30)
                .isCompleted(false)
                .build();

        return mapToResponse(taskRepository.save(task));
    }

    @Transactional
    public TaskDTO.TaskResponse updateTask(Long userId, Long taskId, TaskDTO.TaskRequest request) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + taskId));

        if (!task.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Unauthorized access to task");
        }

        if (request.getTitle() != null) task.setTitle(request.getTitle());
        if (request.getDescription() != null) task.setDescription(request.getDescription());
        if (request.getPriority() != null) task.setPriority(request.getPriority());
        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
            if ("COMPLETED".equalsIgnoreCase(request.getStatus())) {
                task.setIsCompleted(true);
                task.setCompletedAt(LocalDateTime.now());
            }
        }
        if (request.getDueDate() != null) task.setDueDate(request.getDueDate());
        if (request.getEstimatedMinutes() != null) task.setEstimatedMinutes(request.getEstimatedMinutes());

        if (request.getCategoryId() != null) {
            TaskCategory category = categoryRepository.findById(request.getCategoryId()).orElse(null);
            task.setCategory(category);
        }

        return mapToResponse(taskRepository.save(task));
    }

    @Transactional
    public TaskDTO.TaskResponse toggleTaskCompletion(Long userId, Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + taskId));

        if (!task.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Unauthorized access to task");
        }

        boolean current = Boolean.TRUE.equals(task.getIsCompleted());
        task.setIsCompleted(!current);
        task.setStatus(!current ? "COMPLETED" : "PENDING");
        task.setCompletedAt(!current ? LocalDateTime.now() : null);

        return mapToResponse(taskRepository.save(task));
    }

    @Transactional
    public void deleteTask(Long userId, Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with ID: " + taskId));

        if (!task.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Unauthorized access to task");
        }

        taskRepository.delete(task);
    }

    private TaskDTO.TaskResponse mapToResponse(Task task) {
        return TaskDTO.TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .categoryId(task.getCategory() != null ? task.getCategory().getId() : null)
                .categoryName(task.getCategory() != null ? task.getCategory().getName() : "General")
                .categoryColor(task.getCategory() != null ? task.getCategory().getColor() : "#6366f1")
                .priority(task.getPriority())
                .status(task.getStatus())
                .dueDate(task.getDueDate())
                .estimatedMinutes(task.getEstimatedMinutes())
                .isCompleted(task.getIsCompleted())
                .completedAt(task.getCompletedAt() != null ? task.getCompletedAt().toString() : null)
                .createdAt(task.getCreatedAt() != null ? task.getCreatedAt().toString() : null)
                .build();
    }
}
