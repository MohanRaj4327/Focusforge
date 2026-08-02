export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  targetCompany: string;
  dailyFocusGoalMinutes: number;
  targetDsaPerDay: number;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  user: User;
}

export interface CurrentFocus {
  title: string;
  startTime: string;
  endTime: string;
  activityType: string;
}

export interface NextTask {
  title: string;
  startTime: string;
  endTime: string;
  category: string;
}

export interface DsaSummary {
  totalProblems: number;
  solvedProblems: number;
  remainingProblems: number;
  progressPercentage: number;
  currentMonth: number;
  currentTopic: string;
  expectedProblems: number;
  problemsBehind: number;
  status: 'ON_TRACK' | 'BEHIND' | 'NEEDS_ATTENTION' | 'AHEAD';
}

export interface RevisionItem {
  id: number;
  problemId: number;
  problemTitle: string;
  topicName: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  revisionStage: number;
  scheduledDate: string;
  isCompleted: boolean;
}

export interface DeadlineSummary {
  id: number;
  title: string;
  dueDate: string;
  priority: string;
  category: string;
}

export interface StudyStats {
  currentStreakDays: number;
  longestStreakDays: number;
  dailyFocusMinutes: number;
  weeklyFocusMinutes: number;
  monthlyFocusMinutes: number;
  totalProblemsSolved: number;
  overallProductivityScore: number;
}

export interface DailyDashboard {
  currentFocus: CurrentFocus;
  nextTask: NextTask;
  todayProgress: number;
  completedTasks: number;
  totalTasks: number;
  focusMinutes: number;
  dsaSummary: DsaSummary;
  revisionTasks: RevisionItem[];
  upcomingDeadlines: DeadlineSummary[];
  awarenessMessages: string[];
  studyStats: StudyStats;
}

export interface DsaTopic {
  id: number;
  topicName: string;
  monthNumber: number;
  targetProblemCount: number;
  solvedProblemCount: number;
  description: string;
}

export interface DsaProblem {
  id: number;
  topicId: number;
  topicName: string;
  title: string;
  monthNumber: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  isNew: boolean;
  problemOrder: number;
  status: 'UNSOLVED' | 'IN_PROGRESS' | 'SOLVED';
  assignedDate?: string;
  solvedDate?: string;
  attemptCount: number;
  timeTakenMinutes: number;
  notes?: string;
  solutionUrl?: string;
  codeUrl?: string;
  isFlaggedForRevision?: boolean;
}

export interface RevisionQueue {
  dueToday: RevisionItem[];
  upcoming: RevisionItem[];
  overdue: RevisionItem[];
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  categoryId?: number;
  categoryName?: string;
  categoryColor?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate: string;
  estimatedMinutes: number;
  isCompleted: boolean;
  completedAt?: string;
  createdAt?: string;
}

export interface ScheduleBlock {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  activityType: string;
  isCompleted: boolean;
}

export interface Deadline {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: 'ACADEMIC' | 'PLACEMENT' | 'PROJECT' | 'PERSONAL';
  isCompleted: boolean;
}

export interface FocusStatistics {
  todayFocusMinutes: number;
  weeklyFocusMinutes: number;
  monthlyFocusMinutes: number;
  totalCompletedSessions: number;
  currentStreakDays: number;
}
