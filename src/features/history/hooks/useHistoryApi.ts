import { useQuery } from "@tanstack/react-query";
import { getHistoryResultDetail, getHistoryResultList, getSaveProgressHistory } from "../services/historyService";

// export const createHistoryMutation = useMutation({
//   mutationFn: createHistory,
// });

export const useGetSaveHistoryProgress = (id: string) => {
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

export const useGetHistoryResultDetail = (testId: string) => {
  return useQuery({
    queryKey: ['historyDetail'],
    queryFn: () => getHistoryResultDetail(testId),
    enabled: !!testId,
  });
};