import type { TestType } from "@/feature/test/const/testConst";

export interface HistoryResp {
  id: number;
  dataprog: Record<string, string>;
  type: TestType;
  part_id_list: string[];
  dura: number;
  test_id: number;
  user_id: number;
  create_at: string;
  status: "save" | "submit";
}

export interface HistoryCreateReq {
  dataprog: Record<string, string>;
  type: TestType;
  part_id_list: string[];
  dura: number;
  test_id: number;
  status: "save" | "submit";
}

export interface HistoryCreateResp {
  history_id: number
  status: string
  message: string
}

export interface HistoryResultDetailResp {
  history_id: number;
  test_id: number;
  test_type: TestType;
  test_name: string;
  correct_count: number;
  incorrect_count: number;
  correct_listening: number;
  correct_reading: number;
  no_ans: number;
  total_ques: number;
  accuracy: number;
  dura: number;
  create_at: string;
  dataprog: Record<string, string>
  part_id_list: string[];
}

export interface HistoryResultListRes {
  history_id: number;
  score: string;
  test_id: number;
  test_type: TestType;
  test_name: string;
  dura: number;
  part_id_list: string[];
  part_order_list: string[];
  create_at: string;
}