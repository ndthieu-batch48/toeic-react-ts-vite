import { useQuery } from "@tanstack/react-query";
import { getHistoryResultDetail, getHistoryResultList, getSaveProgressHistory } from "../services/historyService";

export const useGetSaveHistoryProgress = (id: number) => {
  return useQuery({
    queryKey: ['historyProgress'],
    queryFn: () => getSaveProgressHistory(id),
    enabled: !!id,
  });
};

export const useGetHistoryResultList = () => {
  return useQuery({
    queryKey: ['historyList'],
    queryFn: getHistoryResultList,
  });
};

export const useGetHistoryResultDetail = (historyId: number) => {
  return useQuery({
    queryKey: ['historyDetail'],
    queryFn: () => getHistoryResultDetail(historyId),
    enabled: !!historyId,
  });
};