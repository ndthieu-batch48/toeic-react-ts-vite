import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createHistory, getHistoryResultDetail, getHistoryResultList, getSaveProgressHistory } from "../service/historyService";

export const useCreateHistory = (testId: number) => {
  const queryClient = useQueryClient();

  const createHistoryMutation = useMutation({
    mutationFn: createHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyList'] });
      queryClient.invalidateQueries({ queryKey: ['historyProgress', testId] });
    },
  });

  return { createHistoryMutation }
}

export const saveHistoryProgOption = (testId: number) => {
  return queryOptions({
    queryKey: ['historyProgress', testId],
    queryFn: () => getSaveProgressHistory(testId),
    enabled: !!testId,
  })
}

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