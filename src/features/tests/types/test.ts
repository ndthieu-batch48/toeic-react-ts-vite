import type { LANGUAGE_ID } from "../constants/const";


export interface AnsDetailRes {
  ans_id: number;
  content: string;
  is_correct: boolean;
}

export interface QuesDetailRes {
  ques_id: number;
  ques_number: number;
  ques_content: string;
  ans_list: AnsDetailRes[];
}

export interface MediaQuesDetailRes {
  media_ques_id: number;
  media_ques_name: string;
  media_ques_main_para: string;
  media_ques_audio_script?: string;
  media_ques_explain?: string;
  media_ques_trans_script?: TranslateQuestionResponse;
  ques_list: QuesDetailRes[];
}

export interface PartDetailRes {
  part_id: number;
  part_order: string;
  part_title: string;
  part_audio_url?: string;
  media_ques_list: MediaQuesDetailRes[];
}

export interface TestDetailRes {
  part_list: PartDetailRes[];
}

export interface PartSummaryRes {
  part_id: number;
  part_order: string;
  part_title: string;
  total_ques: number;
}

export interface TestSummaryRes {
  test_id: number;
  part_list: PartSummaryRes[];
  test_title: string;
  test_dura: number;
  test_descrip: string;
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
  test_id: number;
  part_id: number;
}


