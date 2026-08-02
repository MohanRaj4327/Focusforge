import apiClient from './apiClient';
import { DsaTopic, DsaProblem, DsaSummary, RevisionQueue } from '../types';

export const dsaApi = {
  getTopics: async (): Promise<DsaTopic[]> => {
    const res = await apiClient.get<DsaTopic[]>('/dsa/topics');
    return res.data;
  },

  getProblems: async (topicId?: number, monthNumber?: number): Promise<DsaProblem[]> => {
    const params: Record<string, any> = {};
    if (topicId) params.topicId = topicId;
    if (monthNumber) params.monthNumber = monthNumber;
    const res = await apiClient.get<DsaProblem[]>('/dsa/problems', { params });
    return res.data;
  },

  getSummary: async (): Promise<DsaSummary> => {
    const res = await apiClient.get<DsaSummary>('/dsa/summary');
    return res.data;
  },

  solveProblem: async (id: number): Promise<DsaProblem> => {
    const res = await apiClient.patch<DsaProblem>(`/dsa/problems/${id}/solve`);
    return res.data;
  },

  markDifficult: async (id: number): Promise<DsaProblem> => {
    const res = await apiClient.patch<DsaProblem>(`/dsa/problems/${id}/difficult`);
    return res.data;
  },

  updateProgress: async (id: number, data: { status?: string; timeTakenMinutes?: number; notes?: string; solutionUrl?: string; codeUrl?: string; markAsDifficult?: boolean }): Promise<DsaProblem> => {
    const res = await apiClient.post<DsaProblem>(`/dsa/problems/${id}/progress`, data);
    return res.data;
  },

  getRevisionQueue: async (): Promise<RevisionQueue> => {
    const res = await apiClient.get<RevisionQueue>('/dsa/revision-queue');
    return res.data;
  },

  completeRevision: async (id: number): Promise<void> => {
    await apiClient.post(`/dsa/revisions/${id}/complete`);
  },
};
