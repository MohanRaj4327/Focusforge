package com.focusforge.dto;

import java.util.List;

public class RevisionQueueDTO {

    private List<DashboardDTO.RevisionItemDTO> dueToday;
    private List<DashboardDTO.RevisionItemDTO> upcoming;
    private List<DashboardDTO.RevisionItemDTO> overdue;

    public RevisionQueueDTO() {}

    public RevisionQueueDTO(List<DashboardDTO.RevisionItemDTO> dueToday, List<DashboardDTO.RevisionItemDTO> upcoming, List<DashboardDTO.RevisionItemDTO> overdue) {
        this.dueToday = dueToday;
        this.upcoming = upcoming;
        this.overdue = overdue;
    }

    public List<DashboardDTO.RevisionItemDTO> getDueToday() { return dueToday; }
    public void setDueToday(List<DashboardDTO.RevisionItemDTO> dueToday) { this.dueToday = dueToday; }
    public List<DashboardDTO.RevisionItemDTO> getUpcoming() { return upcoming; }
    public void setUpcoming(List<DashboardDTO.RevisionItemDTO> upcoming) { this.upcoming = upcoming; }
    public List<DashboardDTO.RevisionItemDTO> getOverdue() { return overdue; }
    public void setOverdue(List<DashboardDTO.RevisionItemDTO> overdue) { this.overdue = overdue; }

    public static RevisionQueueDTOBuilder builder() { return new RevisionQueueDTOBuilder(); }

    public static class RevisionQueueDTOBuilder {
        private List<DashboardDTO.RevisionItemDTO> dueToday;
        private List<DashboardDTO.RevisionItemDTO> upcoming;
        private List<DashboardDTO.RevisionItemDTO> overdue;

        public RevisionQueueDTOBuilder dueToday(List<DashboardDTO.RevisionItemDTO> dueToday) { this.dueToday = dueToday; return this; }
        public RevisionQueueDTOBuilder upcoming(List<DashboardDTO.RevisionItemDTO> upcoming) { this.upcoming = upcoming; return this; }
        public RevisionQueueDTOBuilder overdue(List<DashboardDTO.RevisionItemDTO> overdue) { this.overdue = overdue; return this; }

        public RevisionQueueDTO build() {
            return new RevisionQueueDTO(dueToday, upcoming, overdue);
        }
    }
}
