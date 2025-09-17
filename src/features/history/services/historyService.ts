import { axiosJWT } from "@/lib/axios";
import type { HistoryCreateRequest, HistoryResponse, HistoryResultDetailResponse, HistoryResultListResponse, } from "../types/history";

export const createHistory = async (request: HistoryCreateRequest) => {
  const url = 'history'
  const response = await axiosJWT.post(url, request);
  return response.data;
}

export const getSaveProgressHistory = async (testId: string): Promise<HistoryResponse> => {
  const url = 'history/save';
  const response = await axiosJWT.get<HistoryResponse>(url, {
    params: { test_id: testId },
  });
  return response.data;
};

export const getHistoryResultList = async (): Promise<HistoryResultListResponse[]> => {
  const url = 'history/result/list'
  const response = await axiosJWT.get(url);
  return response.data;
}

export const getHistoryResultDetail = async (hitoryId: string): Promise<HistoryResultDetailResponse> => {
  const url = 'history/result/detail'
  const response = await axiosJWT.get<HistoryResultDetailResponse>(url,
    { params: hitoryId },
  );
  return response.data;
}