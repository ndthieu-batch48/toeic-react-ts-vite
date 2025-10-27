import { queryOptions } from "@tanstack/react-query";
import { getPartAudioUrl, getTestDetail } from "../service/testService";

export const testDetailOption = (id: number) => {
  return queryOptions({
    queryKey: ['test', id],
    queryFn: () => getTestDetail(id),
    enabled: !!id,
  })
}

export const partAudioUrlOption = (testId: number, partId: number) => {
  return queryOptions({
    queryKey: ['audio', testId, partId],
    queryFn: () => getPartAudioUrl({ test_id: testId, part_id: partId }),
  })
}