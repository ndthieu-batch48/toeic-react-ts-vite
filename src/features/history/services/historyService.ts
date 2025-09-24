import { axiosJWT } from "@/lib/axios";
import type { HistoryCreateRequest, HistoryResponse as HistorySaveProgressResponse, HistoryResultDetailResponse, HistoryResultListResponse, } from "../types/history";

export const createHistory = async (request: HistoryCreateRequest) => {
  const url = 'history'
  const response = await axiosJWT.post(url, request);
  return response.data;
}

export const getSaveProgressHistory = async (testId: number): Promise<HistorySaveProgressResponse> => {
  const url = 'history/save';
  const response = await axiosJWT.get<HistorySaveProgressResponse>(url, {
    params: { test_id: testId },
  });
  return response.data;
};

export const getHistoryResultList = async (): Promise<HistoryResultListResponse[]> => {
  const url = 'history/v2/result/list'
  const response = await axiosJWT.get(url);
  return response.data;
}

export const getHistoryResultDetail = async (historyId: number): Promise<HistoryResultDetailResponse> => {
  const url = 'history/v2/result/detail'
  const response = await axiosJWT.get<HistoryResultDetailResponse>(url,
    { params: { history_id: historyId } },
  );
  return response.data;
}