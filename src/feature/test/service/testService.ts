import { queryOptions, mutationOptions } from "@tanstack/react-query";
import { axiosBase } from "@/lib/axios";
import type {
  GetPartAudioUrlReq,
  TestDetailRes,
  TestSummaryRes,
  GeminiTransQuesReq,
  GeminiTransQuesResp
} from "../type/testType";

// ========== Services ==========
const testService = {
  getAll: async (): Promise<TestSummaryRes[]> => {
    const url = 'tests';
    const res = await axiosBase.get(url);
    return res.data;
  },

  getById: async (id: number): Promise<TestDetailRes> => {
    const url = `tests/${id}`;
    const res = await axiosBase.get(url);
    return res.data;
  },

  transQuesWithGemini: async (request: GeminiTransQuesReq): Promise<GeminiTransQuesResp> => {
    const url = 'tests/gemini/trans/ques';
    const res = await axiosBase.post(url, request);
    return res.data;
  },

  getPartAudioUrl: async (request: GetPartAudioUrlReq): Promise<string | null> => {
    const url = `tests/${request.test_id}/part/${request.part_id}/audio/url`;
    const res = await axiosBase.get(url);

    if (res.data.audio_stream_url === null) {
      return null;
    }
    return `${import.meta.env.VITE_API_BASE_URL}${res.data.audio_stream_url}`;
  },
} as const;

// ========== Query Options ==========
const testQuery = {
  all: () => queryOptions({
    queryKey: ['tests'],
    queryFn: testService.getAll,
  }),

  byId: (id: number) => queryOptions({
    queryKey: ['test', id],
    queryFn: () => testService.getById(id),
    enabled: !!id,
  }),

  partAudioUrl: (testId: number, partId: number) => queryOptions({
    queryKey: ['audio', testId, partId],
    queryFn: () => testService.getPartAudioUrl({ test_id: testId, part_id: partId }),
  }),
} as const;

// ========== Mutation Options ==========
const testMutation = {
  transQuesWithGemini: () => mutationOptions({
    mutationFn: testService.transQuesWithGemini,
  }),
} as const;

export { testService, testQuery, testMutation };