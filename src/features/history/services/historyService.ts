import { axiosJWT } from "@/lib/axios";
import type { HistoryCreateReq, HistoryResp as HistorySaveProgressResponse, HistoryResultDetailResp, HistoryResultListRes, HistoryCreateResp, } from "../types/history";

export const createHistory = async (request: HistoryCreateReq) => {
  const url = 'histories'
  const response = await axiosJWT.post<HistoryCreateResp>(url, request);
  return response.data;
}

export const getSaveProgressHistory = async (testId: number): Promise<HistorySaveProgressResponse> => {
  const url = 'histories/save';
  const response = await axiosJWT.get<HistorySaveProgressResponse>(url, {
    params: { test_id: testId },
  });
  return response.data;
};

export const getHistoryResultList = async (): Promise<HistoryResultListRes[]> => {
  const url = 'histories/result/list'
  const response = await axiosJWT.get(url);
  return response.data;
}

export const getHistoryResultDetail = async (historyId: number): Promise<HistoryResultDetailResp> => {
  const url = 'histories/result/detail'
  const response = await axiosJWT.get<HistoryResultDetailResp>(url,
    { params: { history_id: historyId } },
  );
  return response.data;
}