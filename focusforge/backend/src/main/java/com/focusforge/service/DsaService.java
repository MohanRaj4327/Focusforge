package com.focusforge.service;

import com.focusforge.dto.DashboardDTO;
import com.focusforge.dto.DsaDTO;
import com.focusforge.dto.RevisionQueueDTO;
import com.focusforge.entity.*;
import com.focusforge.exception.ResourceNotFoundException;
import com.focusforge.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import java.util.stream.Collectors;

@Service
public class DsaService {

    private final DsaTopicRepository topicRepository;
    private final DsaProblemRepository problemRepository;
    private final DsaProgressRepository progressRepository;
    private final DsaRevisionRepository revisionRepository;
    private final UserRepository userRepository;

    public DsaService(DsaTopicRepository topicRepository, DsaProblemRepository problemRepository, DsaProgressRepository progressRepository, DsaRevisionRepository revisionRepository, UserRepository userRepository) {
        this.topicRepository = topicRepository;
        this.problemRepository = problemRepository;
        this.progressRepository = progressRepository;
        this.revisionRepository = revisionRepository;
        this.userRepository = userRepository;
    }

    public List<DsaDTO.TopicResponse> getAllTopics(Long userId) {
        List<DsaTopic> topics = topicRepository.findAll();
        List<DsaProgress> userProgress = progressRepository.findByUserId(userId);

        Map<Long, Long> solvedByTopic = userProgress.stream()
                .filter(p -> "SOLVED".equalsIgnoreCase(p.getStatus()))
                .collect(Collectors.groupingBy(p -> p.getProblem().getTopic().getId(), Collectors.counting()));

        return topics.stream()
                .map(t -> DsaDTO.TopicResponse.builder()
                        .id(t.getId())
                        .topicName(t.getTopicName())
                        .monthNumber(t.getMonthNumber())
                        .targetProblemCount(t.getTargetProblemCount())
                        .solvedProblemCount(solvedByTopic.getOrDefault(t.getId(), 0L).intValue())
                        .description(t.getDescription())
                        .build())
                .collect(Collectors.toList());
    }

    public List<DsaDTO.ProblemResponse> getProblemsByTopicOrMonth(Long userId, Long topicId, Integer monthNumber) {
        List<DsaProblem> problems;
        if (topicId != null) {
            problems = problemRepository.findByTopicIdOrderByProblemOrderAsc(topicId);
        } else if (monthNumber != null) {
            problems = problemRepository.findByMonthNumberOrderByProblemOrderAsc(monthNumber);
        } else {
            problems = problemRepository.findAll();
        }

        Map<Long, DsaProgress> progressMap = progressRepository.findByUserId(userId).stream()
                .collect(Collectors.toMap(p -> p.getProblem().getId(), p -> p));

        List<DsaRevision> userRevisions = revisionRepository.findByUserId(userId);
        Map<Long, Boolean> revisionMap = userRevisions.stream()
                .collect(Collectors.toMap(r -> r.getProblem().getId(), r -> true, (existing, replacement) -> existing));

        return problems.stream()
                .map(prob -> {
                    DsaProgress prog = progressMap.get(prob.getId());
                    return DsaDTO.ProblemResponse.builder()
                            .id(prob.getId())
                            .topicId(prob.getTopic().getId())
                            .topicName(prob.getTopic().getTopicName())
                            .title(prob.getTitle())
                            .monthNumber(prob.getMonthNumber())
                            .difficulty(prob.getDifficulty())
                            .isNew(prob.getIsNew())
                            .problemOrder(prob.getProblemOrder())
                            .status(prog != null ? prog.getStatus() : "UNSOLVED")
                            .assignedDate(prog != null && prog.getAssignedDate() != null ? prog.getAssignedDate().toString() : null)
                            .solvedDate(prog != null && prog.getSolvedDate() != null ? prog.getSolvedDate().toString() : null)
                            .attemptCount(prog != null && prog.getAttemptCount() != null ? prog.getAttemptCount() : 0)
                            .timeTakenMinutes(prog != null && prog.getTimeTakenMinutes() != null ? prog.getTimeTakenMinutes() : 0)
                            .notes(prog != null ? prog.getNotes() : null)
                            .solutionUrl(prog != null ? prog.getSolutionUrl() : null)
                            .codeUrl(prog != null ? prog.getCodeUrl() : null)
                            .isFlaggedForRevision(revisionMap.getOrDefault(prob.getId(), false))
                            .build();
                })
                .collect(Collectors.toList());
    }

    public DsaDTO.RoadmapSummaryResponse getRoadmapSummary(Long userId) {
        long totalProblems = problemRepository.count();
        long solvedProblems = progressRepository.countSolvedByUserId(userId);
        int remaining = (int) (totalProblems - solvedProblems);
        int progressPct = totalProblems > 0 ? (int) ((solvedProblems * 100) / totalProblems) : 0;

        int expected = 45;
        int behind = Math.max(0, expected - (int) solvedProblems);
        String status = solvedProblems >= expected ? "ON_TRACK" : (behind > 10 ? "BEHIND" : "NEEDS_ATTENTION");

        String currentTopic = topicRepository.findById(1L).map(DsaTopic::getTopicName).orElse("Arrays");

        return DsaDTO.RoadmapSummaryResponse.builder()
                .totalProblems((int) totalProblems)
                .solvedProblems((int) solvedProblems)
                .remainingProblems(remaining)
                .progressPercentage(progressPct)
                .currentMonth(1)
                .currentTopic(currentTopic)
                .expectedProblems(expected)
                .problemsBehind(behind)
                .status(status)
                .build();
    }

    @Transactional
    public DsaDTO.ProblemResponse updateProgress(Long userId, Long problemId, DsaDTO.ProgressUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        DsaProblem problem = problemRepository.findById(problemId)
                .orElseThrow(() -> new ResourceNotFoundException("DSA Problem not found with ID: " + problemId));

        DsaProgress progress = progressRepository.findByUserIdAndProblemId(userId, problemId)
                .orElseGet(() -> DsaProgress.builder()
                        .user(user)
                        .problem(problem)
                        .assignedDate(LocalDate.now())
                        .status("UNSOLVED")
                        .build());

        if (request.getStatus() != null) {
            progress.setStatus(request.getStatus());
            if ("SOLVED".equalsIgnoreCase(request.getStatus()) && progress.getSolvedDate() == null) {
                progress.setSolvedDate(LocalDate.now());
            }
        }
        if (request.getTimeTakenMinutes() != null) {
            progress.setTimeTakenMinutes(request.getTimeTakenMinutes());
        }
        if (request.getNotes() != null) {
            progress.setNotes(request.getNotes());
        }
        if (request.getSolutionUrl() != null) {
            progress.setSolutionUrl(request.getSolutionUrl());
        }
        if (request.getCodeUrl() != null) {
            progress.setCodeUrl(request.getCodeUrl());
        }
        progress.setAttemptCount((progress.getAttemptCount() != null ? progress.getAttemptCount() : 0) + 1);

        progressRepository.save(progress);

        if (Boolean.TRUE.equals(request.getMarkAsDifficult())) {
            createSpacedRevisions(user, problem);
        }

        return getProblemsByTopicOrMonth(userId, problem.getTopic().getId(), null).stream()
                .filter(p -> p.getId().equals(problemId))
                .findFirst()
                .orElseThrow();
    }

    @Transactional
    public void createSpacedRevisions(User user, DsaProblem problem) {
        LocalDate today = LocalDate.now();
        int[] intervalDays = {1, 3, 7, 14, 30};

        for (int i = 0; i < intervalDays.length; i++) {
            DsaRevision revision = DsaRevision.builder()
                    .user(user)
                    .problem(problem)
                    .revisionStage(i + 1)
                    .scheduledDate(today.plusDays(intervalDays[i]))
                    .isCompleted(false)
                    .build();
            revisionRepository.save(revision);
        }
    }

    public RevisionQueueDTO getRevisionQueue(Long userId) {
        LocalDate today = LocalDate.now();
        List<DsaRevision> allRevisions = revisionRepository.findByUserId(userId);

        List<DashboardDTO.RevisionItemDTO> dueToday = new ArrayList<>();
        List<DashboardDTO.RevisionItemDTO> upcoming = new ArrayList<>();
        List<DashboardDTO.RevisionItemDTO> overdue = new ArrayList<>();

        for (DsaRevision rev : allRevisions) {
            if (Boolean.TRUE.equals(rev.getIsCompleted())) continue;

            DashboardDTO.RevisionItemDTO item = DashboardDTO.RevisionItemDTO.builder()
                    .id(rev.getId())
                    .problemId(rev.getProblem().getId())
                    .problemTitle(rev.getProblem().getTitle())
                    .topicName(rev.getProblem().getTopic().getTopicName())
                    .difficulty(rev.getProblem().getDifficulty())
                    .revisionStage(rev.getRevisionStage())
                    .scheduledDate(rev.getScheduledDate().toString())
                    .isCompleted(false)
                    .build();

            if (rev.getScheduledDate().isEqual(today)) {
                dueToday.add(item);
            } else if (rev.getScheduledDate().isBefore(today)) {
                overdue.add(item);
            } else {
                upcoming.add(item);
            }
        }

        return RevisionQueueDTO.builder()
                .dueToday(dueToday)
                .upcoming(upcoming)
                .overdue(overdue)
                .build();
    }

    @Transactional
    public void completeRevision(Long userId, Long revisionId) {
        DsaRevision revision = revisionRepository.findById(revisionId)
                .orElseThrow(() -> new ResourceNotFoundException("Revision record not found"));
        if (!revision.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Unauthorized access to revision record");
        }
        revision.setIsCompleted(true);
        revision.setCompletedDate(LocalDate.now());
        revisionRepository.save(revision);
    }
}
