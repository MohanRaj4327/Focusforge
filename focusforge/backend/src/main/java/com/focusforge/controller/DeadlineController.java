package com.focusforge.controller;

import com.focusforge.dto.DeadlineDTO;
import com.focusforge.security.UserPrincipal;
import com.focusforge.service.DeadlineService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deadlines")
public class DeadlineController {

    private final DeadlineService deadlineService;

    public DeadlineController(DeadlineService deadlineService) {
        this.deadlineService = deadlineService;
    }

    @GetMapping
    public ResponseEntity<List<DeadlineDTO.DeadlineResponse>> getAllDeadlines(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(deadlineService.getAllDeadlines(currentUser.getId()));
    }

    @PostMapping
    public ResponseEntity<DeadlineDTO.DeadlineResponse> createDeadline(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                        @Valid @RequestBody DeadlineDTO.DeadlineRequest request) {
        return ResponseEntity.ok(deadlineService.createDeadline(currentUser.getId(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeadlineDTO.DeadlineResponse> updateDeadline(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                        @PathVariable Long id,
                                                                        @Valid @RequestBody DeadlineDTO.DeadlineRequest request) {
        return ResponseEntity.ok(deadlineService.updateDeadline(currentUser.getId(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeadline(@AuthenticationPrincipal UserPrincipal currentUser,
                                               @PathVariable Long id) {
        deadlineService.deleteDeadline(currentUser.getId(), id);
        return ResponseEntity.noContent().build();
    }
}
