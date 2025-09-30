import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createHistory, getHistoryResultDetail, getHistoryResultList, getSaveProgressHistory } from "../services/historyService";

export const useCreateHistory = () => {
  const queryClient = useQueryClient();

  const createHistoryMutation = useMutation({
    mutationFn: createHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyList'] });
    },
  });

  return { createHistoryMutation }
}

export const useGetSaveHistoryProgress = (testId: number) => {
  return useQuery({
    queryKey: ['historyProgress', testId],
    queryFn: () => getSaveProgressHistory(testId),
    enabled: !!testId,
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
    queryKey: ['historyDetail', historyId],
    queryFn: () => getHistoryResultDetail(historyId),
    enabled: !!historyId,
  });
};