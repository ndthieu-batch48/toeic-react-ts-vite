import { queryOptions } from "@tanstack/react-query";
import { getHistoryResultDetail, getHistoryResultList, getSaveProgressHistory } from "../services/historyService";

export const getHistoryResultListOptions = () => {
  return queryOptions({
    queryKey: ['historyList'],
    queryFn: getHistoryResultList,
  });
}

export const getHistoryProgressOptions = (testId: number) => {
  return queryOptions({
    queryKey: ['historyProgress', testId],
    queryFn: () => getSaveProgressHistory(testId),
    enabled: !!testId,
  });
};

export const getHistoryDetailOptions = (historyId: number) => {
  return queryOptions({
    queryKey: ['historyDetail', historyId],
    queryFn: () => getHistoryResultDetail(historyId),
    enabled: !!historyId,
  });
};