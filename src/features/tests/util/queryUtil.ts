import { queryOptions } from "@tanstack/react-query";
import { getPartAudioUrl } from "../services/testService";

export const getPartAudioUrlOption = (testId: number, partId: number) => {
  return queryOptions({
    queryKey: ['audio', testId, partId],
    queryFn: () => getPartAudioUrl({ test_id: testId, part_id: partId }),
  })
}