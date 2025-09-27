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
  history_id: number;
  test_id: number;
  test_type: string;
  test_name: string;
  correct_count: number;
  incorrect_count: number;
  correct_listening: number;
  correct_reading: number;
  no_answer: number;
  total_question: number;
  accuracy: number;
  duration: number;
  create_at: string;
  dataprogress: Record<string, string>
  part_list: string[];
}

export interface HistoryResultListResponse {
  history_id: number;
  score: string;
  test_id: number;
  test_type: string;
  test_name: string;
  duration: number;
  part_list: string[];
  create_at: string;
}
