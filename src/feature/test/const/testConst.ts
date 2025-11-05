export type LANG_ID = "vi" | "ja" | "en"

export type LANG_MAP = Record<LANG_ID, string>

export const LANG_MAP: LANG_MAP = {
  "vi": "Vietnamese",
  "ja": "Japanese",
  "en": "English",
}

export const TEST_TYPE = {
  PRACTICE: "practice",
  EXAM: "exam"
} as const

export type TestType = typeof TEST_TYPE[keyof typeof TEST_TYPE]