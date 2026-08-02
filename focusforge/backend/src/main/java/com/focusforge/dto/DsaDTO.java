package com.focusforge.dto;

public class DsaDTO {

    public static class RoadmapSummaryResponse {
        private int totalProblems;
        private int solvedProblems;
        private int remainingProblems;
        private int progressPercentage;
        private int currentMonth;
        private String currentTopic;
        private int expectedProblems;
        private int problemsBehind;
        private String status;

        public RoadmapSummaryResponse() {}

        public RoadmapSummaryResponse(int totalProblems, int solvedProblems, int remainingProblems, int progressPercentage, int currentMonth, String currentTopic, int expectedProblems, int problemsBehind, String status) {
            this.totalProblems = totalProblems;
            this.solvedProblems = solvedProblems;
            this.remainingProblems = remainingProblems;
            this.progressPercentage = progressPercentage;
            this.currentMonth = currentMonth;
            this.currentTopic = currentTopic;
            this.expectedProblems = expectedProblems;
            this.problemsBehind = problemsBehind;
            this.status = status;
        }

        public int getTotalProblems() { return totalProblems; }
        public void setTotalProblems(int totalProblems) { this.totalProblems = totalProblems; }
        public int getSolvedProblems() { return solvedProblems; }
        public void setSolvedProblems(int solvedProblems) { this.solvedProblems = solvedProblems; }
        public int getRemainingProblems() { return remainingProblems; }
        public void setRemainingProblems(int remainingProblems) { this.remainingProblems = remainingProblems; }
        public int getProgressPercentage() { return progressPercentage; }
        public void setProgressPercentage(int progressPercentage) { this.progressPercentage = progressPercentage; }
        public int getCurrentMonth() { return currentMonth; }
        public void setCurrentMonth(int currentMonth) { this.currentMonth = currentMonth; }
        public String getCurrentTopic() { return currentTopic; }
        public void setCurrentTopic(String currentTopic) { this.currentTopic = currentTopic; }
        public int getExpectedProblems() { return expectedProblems; }
        public void setExpectedProblems(int expectedProblems) { this.expectedProblems = expectedProblems; }
        public int getProblemsBehind() { return problemsBehind; }
        public void setProblemsBehind(int problemsBehind) { this.problemsBehind = problemsBehind; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public static RoadmapSummaryResponseBuilder builder() { return new RoadmapSummaryResponseBuilder(); }

        public static class RoadmapSummaryResponseBuilder {
            private int totalProblems;
            private int solvedProblems;
            private int remainingProblems;
            private int progressPercentage;
            private int currentMonth;
            private String currentTopic;
            private int expectedProblems;
            private int problemsBehind;
            private String status;

            public RoadmapSummaryResponseBuilder totalProblems(int totalProblems) { this.totalProblems = totalProblems; return this; }
            public RoadmapSummaryResponseBuilder solvedProblems(int solvedProblems) { this.solvedProblems = solvedProblems; return this; }
            public RoadmapSummaryResponseBuilder remainingProblems(int remainingProblems) { this.remainingProblems = remainingProblems; return this; }
            public RoadmapSummaryResponseBuilder progressPercentage(int progressPercentage) { this.progressPercentage = progressPercentage; return this; }
            public RoadmapSummaryResponseBuilder currentMonth(int currentMonth) { this.currentMonth = currentMonth; return this; }
            public RoadmapSummaryResponseBuilder currentTopic(String currentTopic) { this.currentTopic = currentTopic; return this; }
            public RoadmapSummaryResponseBuilder expectedProblems(int expectedProblems) { this.expectedProblems = expectedProblems; return this; }
            public RoadmapSummaryResponseBuilder problemsBehind(int problemsBehind) { this.problemsBehind = problemsBehind; return this; }
            public RoadmapSummaryResponseBuilder status(String status) { this.status = status; return this; }

            public RoadmapSummaryResponse build() {
                return new RoadmapSummaryResponse(totalProblems, solvedProblems, remainingProblems, progressPercentage, currentMonth, currentTopic, expectedProblems, problemsBehind, status);
            }
        }
    }

    public static class TopicResponse {
        private Long id;
        private String topicName;
        private int monthNumber;
        private int targetProblemCount;
        private int solvedProblemCount;
        private String description;

        public TopicResponse() {}

        public TopicResponse(Long id, String topicName, int monthNumber, int targetProblemCount, int solvedProblemCount, String description) {
            this.id = id;
            this.topicName = topicName;
            this.monthNumber = monthNumber;
            this.targetProblemCount = targetProblemCount;
            this.solvedProblemCount = solvedProblemCount;
            this.description = description;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getTopicName() { return topicName; }
        public void setTopicName(String topicName) { this.topicName = topicName; }
        public int getMonthNumber() { return monthNumber; }
        public void setMonthNumber(int monthNumber) { this.monthNumber = monthNumber; }
        public int getTargetProblemCount() { return targetProblemCount; }
        public void setTargetProblemCount(int targetProblemCount) { this.targetProblemCount = targetProblemCount; }
        public int getSolvedProblemCount() { return solvedProblemCount; }
        public void setSolvedProblemCount(int solvedProblemCount) { this.solvedProblemCount = solvedProblemCount; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public static TopicResponseBuilder builder() { return new TopicResponseBuilder(); }

        public static class TopicResponseBuilder {
            private Long id;
            private String topicName;
            private int monthNumber;
            private int targetProblemCount;
            private int solvedProblemCount;
            private String description;

            public TopicResponseBuilder id(Long id) { this.id = id; return this; }
            public TopicResponseBuilder topicName(String topicName) { this.topicName = topicName; return this; }
            public TopicResponseBuilder monthNumber(int monthNumber) { this.monthNumber = monthNumber; return this; }
            public TopicResponseBuilder targetProblemCount(int targetProblemCount) { this.targetProblemCount = targetProblemCount; return this; }
            public TopicResponseBuilder solvedProblemCount(int solvedProblemCount) { this.solvedProblemCount = solvedProblemCount; return this; }
            public TopicResponseBuilder description(String description) { this.description = description; return this; }

            public TopicResponse build() {
                return new TopicResponse(id, topicName, monthNumber, targetProblemCount, solvedProblemCount, description);
            }
        }
    }

    public static class ProblemResponse {
        private Long id;
        private Long topicId;
        private String topicName;
        private String title;
        private int monthNumber;
        private String difficulty;
        private boolean isNew;
        private int problemOrder;
        private String status;
        private String assignedDate;
        private String solvedDate;
        private int attemptCount;
        private int timeTakenMinutes;
        private String notes;
        private String solutionUrl;
        private String codeUrl;
        private boolean isFlaggedForRevision;

        public ProblemResponse() {}

        public ProblemResponse(Long id, Long topicId, String topicName, String title, int monthNumber, String difficulty, boolean isNew, int problemOrder, String status, String assignedDate, String solvedDate, int attemptCount, int timeTakenMinutes, String notes, String solutionUrl, String codeUrl, boolean isFlaggedForRevision) {
            this.id = id;
            this.topicId = topicId;
            this.topicName = topicName;
            this.title = title;
            this.monthNumber = monthNumber;
            this.difficulty = difficulty;
            this.isNew = isNew;
            this.problemOrder = problemOrder;
            this.status = status;
            this.assignedDate = assignedDate;
            this.solvedDate = solvedDate;
            this.attemptCount = attemptCount;
            this.timeTakenMinutes = timeTakenMinutes;
            this.notes = notes;
            this.solutionUrl = solutionUrl;
            this.codeUrl = codeUrl;
            this.isFlaggedForRevision = isFlaggedForRevision;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Long getTopicId() { return topicId; }
        public void setTopicId(Long topicId) { this.topicId = topicId; }
        public String getTopicName() { return topicName; }
        public void setTopicName(String topicName) { this.topicName = topicName; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public int getMonthNumber() { return monthNumber; }
        public void setMonthNumber(int monthNumber) { this.monthNumber = monthNumber; }
        public String getDifficulty() { return difficulty; }
        public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
        public boolean isNew() { return isNew; }
        public void setNew(boolean isNew) { this.isNew = isNew; }
        public int getProblemOrder() { return problemOrder; }
        public void setProblemOrder(int problemOrder) { this.problemOrder = problemOrder; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getAssignedDate() { return assignedDate; }
        public void setAssignedDate(String assignedDate) { this.assignedDate = assignedDate; }
        public String getSolvedDate() { return solvedDate; }
        public void setSolvedDate(String solvedDate) { this.solvedDate = solvedDate; }
        public int getAttemptCount() { return attemptCount; }
        public void setAttemptCount(int attemptCount) { this.attemptCount = attemptCount; }
        public int getTimeTakenMinutes() { return timeTakenMinutes; }
        public void setTimeTakenMinutes(int timeTakenMinutes) { this.timeTakenMinutes = timeTakenMinutes; }
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
        public String getSolutionUrl() { return solutionUrl; }
        public void setSolutionUrl(String solutionUrl) { this.solutionUrl = solutionUrl; }
        public String getCodeUrl() { return codeUrl; }
        public void setCodeUrl(String codeUrl) { this.codeUrl = codeUrl; }
        public boolean isFlaggedForRevision() { return isFlaggedForRevision; }
        public void setFlaggedForRevision(boolean isFlaggedForRevision) { this.isFlaggedForRevision = isFlaggedForRevision; }

        public static ProblemResponseBuilder builder() { return new ProblemResponseBuilder(); }

        public static class ProblemResponseBuilder {
            private Long id;
            private Long topicId;
            private String topicName;
            private String title;
            private int monthNumber;
            private String difficulty;
            private boolean isNew;
            private int problemOrder;
            private String status;
            private String assignedDate;
            private String solvedDate;
            private int attemptCount;
            private int timeTakenMinutes;
            private String notes;
            private String solutionUrl;
            private String codeUrl;
            private boolean isFlaggedForRevision;

            public ProblemResponseBuilder id(Long id) { this.id = id; return this; }
            public ProblemResponseBuilder topicId(Long topicId) { this.topicId = topicId; return this; }
            public ProblemResponseBuilder topicName(String topicName) { this.topicName = topicName; return this; }
            public ProblemResponseBuilder title(String title) { this.title = title; return this; }
            public ProblemResponseBuilder monthNumber(int monthNumber) { this.monthNumber = monthNumber; return this; }
            public ProblemResponseBuilder difficulty(String difficulty) { this.difficulty = difficulty; return this; }
            public ProblemResponseBuilder isNew(boolean isNew) { this.isNew = isNew; return this; }
            public ProblemResponseBuilder problemOrder(int problemOrder) { this.problemOrder = problemOrder; return this; }
            public ProblemResponseBuilder status(String status) { this.status = status; return this; }
            public ProblemResponseBuilder assignedDate(String assignedDate) { this.assignedDate = assignedDate; return this; }
            public ProblemResponseBuilder solvedDate(String solvedDate) { this.solvedDate = solvedDate; return this; }
            public ProblemResponseBuilder attemptCount(int attemptCount) { this.attemptCount = attemptCount; return this; }
            public ProblemResponseBuilder timeTakenMinutes(int timeTakenMinutes) { this.timeTakenMinutes = timeTakenMinutes; return this; }
            public ProblemResponseBuilder notes(String notes) { this.notes = notes; return this; }
            public ProblemResponseBuilder solutionUrl(String solutionUrl) { this.solutionUrl = solutionUrl; return this; }
            public ProblemResponseBuilder codeUrl(String codeUrl) { this.codeUrl = codeUrl; return this; }
            public ProblemResponseBuilder isFlaggedForRevision(boolean isFlaggedForRevision) { this.isFlaggedForRevision = isFlaggedForRevision; return this; }

            public ProblemResponse build() {
                return new ProblemResponse(id, topicId, topicName, title, monthNumber, difficulty, isNew, problemOrder, status, assignedDate, solvedDate, attemptCount, timeTakenMinutes, notes, solutionUrl, codeUrl, isFlaggedForRevision);
            }
        }
    }

    public static class ProgressUpdateRequest {
        private String status;
        private Integer timeTakenMinutes;
        private String notes;
        private String solutionUrl;
        private String codeUrl;
        private Boolean markAsDifficult;

        public ProgressUpdateRequest() {}

        public ProgressUpdateRequest(String status, Integer timeTakenMinutes, String notes, String solutionUrl, String codeUrl, Boolean markAsDifficult) {
            this.status = status;
            this.timeTakenMinutes = timeTakenMinutes;
            this.notes = notes;
            this.solutionUrl = solutionUrl;
            this.codeUrl = codeUrl;
            this.markAsDifficult = markAsDifficult;
        }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public Integer getTimeTakenMinutes() { return timeTakenMinutes; }
        public void setTimeTakenMinutes(Integer timeTakenMinutes) { this.timeTakenMinutes = timeTakenMinutes; }
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
        public String getSolutionUrl() { return solutionUrl; }
        public void setSolutionUrl(String solutionUrl) { this.solutionUrl = solutionUrl; }
        public String getCodeUrl() { return codeUrl; }
        public void setCodeUrl(String codeUrl) { this.codeUrl = codeUrl; }
        public Boolean getMarkAsDifficult() { return markAsDifficult; }
        public void setMarkAsDifficult(Boolean markAsDifficult) { this.markAsDifficult = markAsDifficult; }

        public static ProgressUpdateRequestBuilder builder() { return new ProgressUpdateRequestBuilder(); }

        public static class ProgressUpdateRequestBuilder {
            private String status;
            private Integer timeTakenMinutes;
            private String notes;
            private String solutionUrl;
            private String codeUrl;
            private Boolean markAsDifficult;

            public ProgressUpdateRequestBuilder status(String status) { this.status = status; return this; }
            public ProgressUpdateRequestBuilder timeTakenMinutes(Integer timeTakenMinutes) { this.timeTakenMinutes = timeTakenMinutes; return this; }
            public ProgressUpdateRequestBuilder notes(String notes) { this.notes = notes; return this; }
            public ProgressUpdateRequestBuilder solutionUrl(String solutionUrl) { this.solutionUrl = solutionUrl; return this; }
            public ProgressUpdateRequestBuilder codeUrl(String codeUrl) { this.codeUrl = codeUrl; return this; }
            public ProgressUpdateRequestBuilder markAsDifficult(Boolean markAsDifficult) { this.markAsDifficult = markAsDifficult; return this; }

            public ProgressUpdateRequest build() {
                return new ProgressUpdateRequest(status, timeTakenMinutes, notes, solutionUrl, codeUrl, markAsDifficult);
            }
        }
    }
}
