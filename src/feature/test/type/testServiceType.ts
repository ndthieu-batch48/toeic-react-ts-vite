import type { LANGUAGE_ID } from "../const/testConst";

export interface AnswerDetailResponse {
  answer_id: number;
  content: string;
  is_correct: boolean;
}

export interface QuestionDetailResponse {
  question_id: number;
  question_number: number;
  question_content: string;
  answer_list: AnswerDetailResponse[];
}

export interface MediaQuestionDetailResponse {
  media_question_id: number;
  media_question_name: string;
  media_question_main_paragraph: string;
  media_question_audio_script?: string;
  question_list: QuestionDetailResponse[];
}

export interface PartDetailResponse {
  part_id: number;
  part_order: string;
  part_title: string;
  part_audio_url?: string;
  media_question_list: MediaQuestionDetailResponse[];
}

export interface TestDetailResponse {
  part_list: PartDetailResponse[];
}

export interface PartSummaryResponse {
  part_id: number;
  part_order: string;
  part_title: string;
  total_question: number;
}

export interface TestSummaryResponse {
  test_id: number;
  test_title: string;
  test_duration: number;
  test_description: string;
  part_list: PartSummaryResponse[];
}

export interface GetPartAudioUrlRequest {
  test_id: number;
  part_id: number;
}

export interface GeminiTranslateQuestionResponse {
  question_id: number;
  question_content: string;
  answer_list: string[];
  language_id: LANGUAGE_ID;
}

export interface GeminiTranslateQuestionRequest {
  question_id: number;
  language_id: LANGUAGE_ID;
}

export interface GeminiExplainQuestionResponse {
  question_id: number
  question_ask: string
  question_need: string
  correct_answer_reason: string
  incorrect_answer_reason: Record<string, string>
  language_id: LANGUAGE_ID
}

export interface GeminiExplainQuesRequest {
  question_id: number
  language_id: LANGUAGE_ID
}


