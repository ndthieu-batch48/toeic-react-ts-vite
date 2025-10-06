import { queryOptions } from "@tanstack/react-query";
import { getPartAudio } from "../services/testService";

export const getPartAudioOption = (testId: number, partId: number) => {
  return queryOptions({
    queryKey: ['audio', testId, partId],
    queryFn: () => getPartAudio(testId, partId),
    staleTime: 1000 * 60 * 30, // 30 minutes - cache audio files longer
    gcTime: 1000 * 60 * 60, // 1 hour - keep in cache for 1 hour
    retry: 2, // Reduce retries for large files
  })
}