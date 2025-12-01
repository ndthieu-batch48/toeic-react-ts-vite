import type { TestType } from "@/feature/test/const/testConst";

export interface HistoryResponse {
  id: number;
  data_progress: Record<string, string>;
  type: TestType;
  part_id_list: string[];
  practice_duration: number;
  exam_duration: number;
  test_id: number;
  user_id: number;
  create_at: string;
  status: "save" | "submit";
}

export interface HistoryCreateRequest {
  data_progress: Record<string, string>;
  type: TestType;
  part_id_list: string[];
  practice_duration?: number;
  exam_duration?: number;
  test_id: number;
  status: "save" | "submit";
}

export interface HistoryCreateResponse {
  history_id: number
  status: string
  message: string
}

export interface PartResultDetail {
  part_order: string;
  total_question: number;
  correct_count: number;
  incorrect_count: number;
  no_answer: number;
}
export interface HistoryResultDetailResponse {
  history_id: number;
  test_id: number;
  test_type: TestType;
  test_name: string;
  correct_count: number;
  incorrect_count: number;
  correct_listening: number;
  correct_reading: number;
  no_answer: number;
  total_question: number;
  accuracy: number;
  practice_duration: number;
  exam_duration: number;
  create_at: string;
  data_progress: Record<string, string>
  part_id_list: string[];
  result_by_part: PartResultDetail[];
}

export interface HistoryResultListResponse {
  history_id: number;
  score: string;
  test_id: number;
  test_type: TestType;
  test_name: string;
  practice_duration: number;
  exam_duration: number;
  part_id_list: string[];
  part_order_list: string[];
  create_at: string;
}