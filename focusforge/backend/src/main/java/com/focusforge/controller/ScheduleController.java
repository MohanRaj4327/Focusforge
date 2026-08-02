package com.focusforge.controller;

import com.focusforge.dto.ScheduleDTO;
import com.focusforge.security.UserPrincipal;
import com.focusforge.service.ScheduleService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping("/today")
    public ResponseEntity<List<ScheduleDTO.ScheduleBlockResponse>> getTodaySchedule(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(scheduleService.getTodaySchedule(currentUser.getId()));
    }

    @GetMapping("/week")
    public ResponseEntity<List<ScheduleDTO.ScheduleBlockResponse>> getWeekSchedule(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(scheduleService.getWeekSchedule(currentUser.getId()));
    }

    @PostMapping
    public ResponseEntity<ScheduleDTO.ScheduleBlockResponse> createScheduleBlock(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                                  @Valid @RequestBody ScheduleDTO.ScheduleBlockRequest request) {
        return ResponseEntity.ok(scheduleService.createScheduleBlock(currentUser.getId(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScheduleDTO.ScheduleBlockResponse> updateScheduleBlock(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                                  @PathVariable Long id,
                                                                                  @Valid @RequestBody ScheduleDTO.ScheduleBlockRequest request) {
        return ResponseEntity.ok(scheduleService.updateScheduleBlock(currentUser.getId(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScheduleBlock(@AuthenticationPrincipal UserPrincipal currentUser,
                                                     @PathVariable Long id) {
        scheduleService.deleteScheduleBlock(currentUser.getId(), id);
        return ResponseEntity.noContent().build();
    }
}
