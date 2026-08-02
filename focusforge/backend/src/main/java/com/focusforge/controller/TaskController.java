package com.focusforge.controller;

import com.focusforge.dto.TaskDTO;
import com.focusforge.security.UserPrincipal;
import com.focusforge.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO.TaskResponse>> getAllTasks(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(taskService.getAllTasks(currentUser.getId()));
    }

    @GetMapping("/today")
    public ResponseEntity<List<TaskDTO.TaskResponse>> getTodayTasks(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(taskService.getTodayTasks(currentUser.getId()));
    }

    @PostMapping
    public ResponseEntity<TaskDTO.TaskResponse> createTask(@AuthenticationPrincipal UserPrincipal currentUser,
                                                            @Valid @RequestBody TaskDTO.TaskRequest request) {
        return ResponseEntity.ok(taskService.createTask(currentUser.getId(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO.TaskResponse> updateTask(@AuthenticationPrincipal UserPrincipal currentUser,
                                                            @PathVariable Long id,
                                                            @Valid @RequestBody TaskDTO.TaskRequest request) {
        return ResponseEntity.ok(taskService.updateTask(currentUser.getId(), id, request));
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<TaskDTO.TaskResponse> toggleCompleteTask(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                   @PathVariable Long id) {
        return ResponseEntity.ok(taskService.toggleTaskCompletion(currentUser.getId(), id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@AuthenticationPrincipal UserPrincipal currentUser,
                                           @PathVariable Long id) {
        taskService.deleteTask(currentUser.getId(), id);
        return ResponseEntity.noContent().build();
    }
}
