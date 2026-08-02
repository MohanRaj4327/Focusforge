package com.focusforge.controller;

import com.focusforge.dto.FocusSessionDTO;
import com.focusforge.security.UserPrincipal;
import com.focusforge.service.FocusSessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/focus-sessions")
public class FocusSessionController {

    private final FocusSessionService focusService;

    public FocusSessionController(FocusSessionService focusService) {
        this.focusService = focusService;
    }

    @PostMapping("/start")
    public ResponseEntity<FocusSessionDTO.SessionResponse> startSession(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                         @RequestBody FocusSessionDTO.StartSessionRequest request) {
        return ResponseEntity.ok(focusService.startSession(currentUser.getId(), request));
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<FocusSessionDTO.SessionResponse> completeSession(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                            @PathVariable Long id) {
        return ResponseEntity.ok(focusService.completeSession(currentUser.getId(), id));
    }

    @GetMapping("/statistics")
    public ResponseEntity<FocusSessionDTO.FocusStatisticsResponse> getStatistics(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(focusService.getStatistics(currentUser.getId()));
    }
}
