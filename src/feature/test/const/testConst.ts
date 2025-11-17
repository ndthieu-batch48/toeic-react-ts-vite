export type LANG_ID = "vi" | "ja" | "en";

type LANG_MAP_TYPE = {
  id: LANG_ID;
  name: string;
  flag: string;
};

export const LANG_MAP: LANG_MAP_TYPE[] = [
  { id: "vi", name: "VN", flag: "vn" },
  { id: "en", name: "EN", flag: "uk" },
  { id: "ja", name: "JP", flag: "jp" }
];


export const TEST_TYPE = {
  PRACTICE: "practice",
  EXAM: "exam"
} as const

export type TestType = typeof TEST_TYPE[keyof typeof TEST_TYPE]