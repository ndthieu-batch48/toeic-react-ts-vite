import { axiosBase } from "@/lib/axios";
import axios, { type AxiosError } from 'axios';
import type { Test, TranslateQuestionRequest, TranslateQuestionResponse } from "../types/test";

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

// export const getPartAudio = async (testId: number, partId: number): Promise<string> => {
//   const url = `test/${testId}/part/${partId}/audio `;
//   const res = await axiosBase.get(url);

//   console.log(res)

//   return res.data;
// }


interface AudioErrorResponse {
  detail: string;
}

interface AudioResult {
  success: boolean;
  audioUrl?: string;
  error?: string;
}

export const getPartAudio = async (
  testId: number,
  partId: number
): Promise<AudioResult> => {
  try {
    // Instead of downloading the entire file, just return the direct URL
    // This allows the browser's audio element to stream the file
    const audioUrl = `/api/test/${testId}/part/${partId}/audio`;

    // Validate that the URL is accessible with a HEAD request
    await axios.head(audioUrl, {
      timeout: 5000, // Quick timeout for validation
    });

    return {
      success: true,
      audioUrl
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<AudioErrorResponse>;
      return {
        success: false,
        error: axiosError.response?.data?.detail || 'Audio file not accessible'
      };
    }

    return {
      success: false,
      error: 'Unknown error occurred'
    };
  }
};

export const geminiTranslateQuestion = async (request: TranslateQuestionRequest): Promise<TranslateQuestionResponse> => {
  const url = 'test/gemini/translate/question';
  const res = await axiosBase.post(url, request);
  return res.data;
}
