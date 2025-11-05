import type { LANG_ID } from "../const/testConst";

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
  media_ques_main_parag: string;
  media_ques_audio_script?: string;
  media_ques_explain?: string;
  media_ques_trans_script?: GeminiTransQuesResp;
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

export interface GetPartAudioUrlReq {
  test_id: number;
  part_id: number;
}

export interface GeminiTransQuesResp {
  ques_id: number;
  ques_content: string;
  ans_list: string[];
  lang_id: LANG_ID;
}

export interface GeminiTransQuesReq {
  ques_id: number;
  lang_id: LANG_ID;
}

export interface GeminiExplainQuesReq {
  ques_id: number
  lang_id: LANG_ID
}

export interface GeminiExplainQuesResp {
  lang_id: LANG_ID;
  ques_id: number;
  ques_need: string;
  ques_ask: string;
  correct_ans_reason: string;
  incorrect_ans_reason: Record<string, string>;
}


