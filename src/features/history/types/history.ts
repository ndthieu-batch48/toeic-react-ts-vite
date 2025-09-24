export interface HistoryResponse {
  id: number;
  dataprogress: Record<string, string>; // JSON<Dict[str, str]>
  type: string;                         // e.g. "Practice", "FullTest"
  part: string[];
  time: number;
  test_id: number;
  user_id: number;
  create_at: string;
  status: string;                       // e.g. "submit"
  time_left?: number | null;
}

export interface HistoryCreateRequest {
  dataprogress: Record<string, string>;
  type: string;
  part: string[];
  time: number;
  test_id: number;
  status?: "save" | "submit";           // default = "save"
  time_left?: number | null;            // default = 0 in backend
}

export interface HistoryResultDetailResponse {
  total_question: number;
  test_type: string;
  correct_count: number;
  incorrect_count: number;
  correct_listening: number;
  correct_reading: number;
  no_answer: number;
  accuracy: number;
  create_at: string;
  duration: number;
  dataprogress: Record<string, string>
}

export interface HistoryResultListResponse {
  history_id: number;
  test_id: number;
  test_type: string;
  create_at: string;
  duration: number;
  testname: string;
  score: string;
  part_list: string[];
}
