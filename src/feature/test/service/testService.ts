import { axiosBase } from "@/lib/axios";
import type { GetPartAudioRequest, TestDetailRes, TestSummaryRes, TranslateQuestionRequest, TranslateQuestionResponse } from "../type/testType";

export const getAllTests = async (): Promise<TestSummaryRes[]> => {
  const url = 'tests';
  const res = await axiosBase.get(url);
  return res.data;
};

export const getTestDetail = async (id: number): Promise<TestDetailRes> => {
  const url = `tests/${id}`;
  const res = await axiosBase.get(url);
  return res.data;
};

export const geminiTranslateQuestion = async (request: TranslateQuestionRequest): Promise<TranslateQuestionResponse> => {
  const url = 'tests/gemini/trans/ques';
  const res = await axiosBase.post(url, request);
  return res.data;
}

export const getPartAudioUrl = async (request: GetPartAudioRequest): Promise<string | null> => {
  const url = `tests/${request.test_id}/part/${request.part_id}/audio/url`;
  const res = await axiosBase.get(url);

  if (res.data.audio_stream_url === null) {
    return null;
  }
  return `${import.meta.env.VITE_API_BASE_URL}${res.data.audio_stream_url}`;
}