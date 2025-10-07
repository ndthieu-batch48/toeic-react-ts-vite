import { axiosBase } from "@/lib/axios";
import type { GetPartAudioRequest, Test, TranslateQuestionRequest, TranslateQuestionResponse } from "../types/test";

export const getAllTests = async (): Promise<Test[]> => {
  const url = 'test/all';
  const res = await axiosBase.get(url);
  return res.data;
};

export const getTestDetail = async (id: number): Promise<Test> => {
  const url = `test/${id}`;
  const res = await axiosBase.get(url);
  return res.data;
};

export const geminiTranslateQuestion = async (request: TranslateQuestionRequest): Promise<TranslateQuestionResponse> => {
  const url = 'test/gemini/translate/question';
  const res = await axiosBase.post(url, request);
  return res.data;
}

export const getPartAudioUrl = async (request: GetPartAudioRequest): Promise<string | null> => {
  const url = `test/${request.testId}/part/${request.partId}/audio/url`;
  const res = await axiosBase.get(url);

  if (res.data.audio_stream_url === null) {
    return null;
  }
  return `${import.meta.env.VITE_API_BASE_URL}${res.data.audio_stream_url}`;
}