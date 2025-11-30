import { queryOptions, mutationOptions } from '@tanstack/react-query';
import { axiosJWT } from '@/common/lib/axios';
import type {
  HistoryCreateRequest,
  HistoryResponse,
  HistoryResultDetailResponse,
  HistoryResultListResponse,
  HistoryCreateResponse
} from '../type/historyServiceType';

// ========== Services ==========
const historyService = {
  create: async (request: HistoryCreateRequest) => {
    const url = 'histories';
    const response = await axiosJWT.post<HistoryCreateResponse>(url, request);
    return response.data;
  },

  getSaveProgress: async (testId: number): Promise<HistoryResponse> => {
    const url = 'histories/save';
    const response = await axiosJWT.get<HistoryResponse>(url, {
      params: { test_id: testId },
    });
    return response.data;
  },

  getResultList: async (): Promise<HistoryResultListResponse[]> => {
    const url = 'histories/result/list';
    const response = await axiosJWT.get(url);
    return response.data;
  },

  getResultDetail: async (historyId: number): Promise<HistoryResultDetailResponse> => {
    const url = 'histories/result/detail';
    const response = await axiosJWT.get<HistoryResultDetailResponse>(url, {
      params: { history_id: historyId },
    });
    return response.data;
  },
} as const;

// ========== Query Options ==========
const historyQuery = {
  saveProgress: (testId: number) => queryOptions({
    queryKey: ['historyProgress', testId],
    queryFn: () => historyService.getSaveProgress(testId),
    enabled: !!testId,
  }),

  resultList: () => queryOptions({
    queryKey: ['historyList'],
    queryFn: historyService.getResultList,
  }),

  resultDetail: (historyId: number) => queryOptions({
    queryKey: ['historyDetail', historyId],
    queryFn: () => historyService.getResultDetail(historyId),
    enabled: !!historyId,
  }),
} as const;

// ========== Mutation Options ==========
const historyMutation = {
  create: () => mutationOptions({
    mutationFn: historyService.create,
  }),
} as const;

export { historyService, historyQuery, historyMutation };