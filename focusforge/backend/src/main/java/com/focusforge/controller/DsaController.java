package com.focusforge.controller;

import com.focusforge.dto.DsaDTO;
import com.focusforge.dto.RevisionQueueDTO;
import com.focusforge.security.UserPrincipal;
import com.focusforge.service.DsaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dsa")
public class DsaController {

    private final DsaService dsaService;

    public DsaController(DsaService dsaService) {
        this.dsaService = dsaService;
    }

    @GetMapping("/topics")
    public ResponseEntity<List<DsaDTO.TopicResponse>> getTopics(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(dsaService.getAllTopics(currentUser.getId()));
    }

    @GetMapping("/problems")
    public ResponseEntity<List<DsaDTO.ProblemResponse>> getProblems(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                      @RequestParam(required = false) Long topicId,
                                                                      @RequestParam(required = false) Integer monthNumber) {
        return ResponseEntity.ok(dsaService.getProblemsByTopicOrMonth(currentUser.getId(), topicId, monthNumber));
    }

    @GetMapping("/summary")
    public ResponseEntity<DsaDTO.RoadmapSummaryResponse> getSummary(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(dsaService.getRoadmapSummary(currentUser.getId()));
    }

    @PostMapping("/problems/{id}/progress")
    public ResponseEntity<DsaDTO.ProblemResponse> updateProgress(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                 @PathVariable Long id,
                                                                 @RequestBody DsaDTO.ProgressUpdateRequest request) {
        return ResponseEntity.ok(dsaService.updateProgress(currentUser.getId(), id, request));
    }

    @PatchMapping("/problems/{id}/solve")
    public ResponseEntity<DsaDTO.ProblemResponse> solveProblem(@AuthenticationPrincipal UserPrincipal currentUser,
                                                               @PathVariable Long id) {
        DsaDTO.ProgressUpdateRequest request = DsaDTO.ProgressUpdateRequest.builder()
                .status("SOLVED")
                .build();
        return ResponseEntity.ok(dsaService.updateProgress(currentUser.getId(), id, request));
    }

    @PatchMapping("/problems/{id}/difficult")
    public ResponseEntity<DsaDTO.ProblemResponse> markProblemDifficult(@AuthenticationPrincipal UserPrincipal currentUser,
                                                                        @PathVariable Long id) {
        DsaDTO.ProgressUpdateRequest request = DsaDTO.ProgressUpdateRequest.builder()
                .markAsDifficult(true)
                .build();
        return ResponseEntity.ok(dsaService.updateProgress(currentUser.getId(), id, request));
    }

    @GetMapping("/revision-queue")
    public ResponseEntity<RevisionQueueDTO> getRevisionQueue(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(dsaService.getRevisionQueue(currentUser.getId()));
    }

    @PostMapping("/revisions/{id}/complete")
    public ResponseEntity<Void> completeRevision(@AuthenticationPrincipal UserPrincipal currentUser,
                                                  @PathVariable Long id) {
        dsaService.completeRevision(currentUser.getId(), id);
        return ResponseEntity.ok().build();
    }
}
