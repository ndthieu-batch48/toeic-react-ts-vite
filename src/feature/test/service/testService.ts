import { queryOptions, mutationOptions } from "@tanstack/react-query";
import { axiosBase } from "@/common/lib/axios";
import type {
  GetPartAudioUrlRequest,
  TestDetailResponse,
  TestSummaryResponse,
  GeminiTranslateQuestionRequest,
  GeminiTranslateQuestionResponse,
  GeminiExplainQuesRequest,
  GeminiExplainQuestionResponse
} from "../type/testServiceType";

// ========== Services ==========
const testService = {
  getAll: async (): Promise<TestSummaryResponse[]> => {
    const url = 'tests';
    const res = await axiosBase.get(url);
    return res.data;
  },

  getById: async (id: number): Promise<TestDetailResponse> => {
    const url = `tests/${id}`;
    const res = await axiosBase.get(url);
    return res.data;
  },

  transQuesWithGemini: async (request: GeminiTranslateQuestionRequest): Promise<GeminiTranslateQuestionResponse> => {
    const url = 'tests/gemini/translate/question';
    const res = await axiosBase.post(url, request);
    return res.data;
  },

  explainQuesWithGemini: async (request: GeminiExplainQuesRequest): Promise<GeminiExplainQuestionResponse> => {
    const url = 'tests/gemini/explain/question';
    const res = await axiosBase.post(url, request);
    return res.data;
  },

  getPartAudioUrl: async (request: GetPartAudioUrlRequest): Promise<string | null> => {
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
  explainQuesWithGemini: () => mutationOptions({
    mutationFn: testService.explainQuesWithGemini,
  }),
} as const;

export { testService, testQuery, testMutation };