export type LANG_ID = "vi" | "ja" | "en";

type LANG_MAP_TYPE = {
  id: LANG_ID;
  name: string;
  flag: string;
};

export const LANG_MAP: LANG_MAP_TYPE[] = [
  { id: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { id: "en", name: "English", flag: "🇬🇧" },
  { id: "ja", name: "Japanese", flag: "🇯🇵" }
];


export const TEST_TYPE = {
  PRACTICE: "practice",
  EXAM: "exam"
} as const

export type TestType = typeof TEST_TYPE[keyof typeof TEST_TYPE]