import type { LANGUAGE_ID } from "../constants/const";

export interface Answer {
  answer_id: number;
  content: string;
  is_correct: boolean;
}

export interface Question {
  question_id: number;
  question_number: number;
  question_content: string;
  answer_list: Answer[]
}

export interface MediaQuestion {
  media_id: number;
  media_name: string;
  media_audio_script: string;
  media_paragraph_main: string;
  media_explain_question: string;
  media_translate_script: TranslateQuestionResponse;
  question_list: Question[]
}

export interface Part {
  part_id: number;
  part_order: string;
  part_title: string;
  total_question: number;

  // Additional fields từ detail page
  part_audio_url?: string;
  media_list?: MediaQuestion[];
}

export interface Test {
  test_id: number;
  test_title: string;
  test_duration: number;
  test_description: string;
  part_list: Part[];
}


export interface TranslateQuestionResponse {
  question_id: number;
  question_content: string;
  answer_list: string[];
  language_id: LANGUAGE_ID;
}

export interface TranslateQuestionRequest {
  question_id: number;
  language_id: LANGUAGE_ID;
}

export interface GetPartAudioRequest {
  testId: number;
  partId: number;
}


