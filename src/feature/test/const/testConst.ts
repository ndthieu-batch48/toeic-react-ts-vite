export type LANGUAGE_ID = "vi" | "ja" | "en"

export type LANGUAGE_MAP = Record<LANGUAGE_ID, string>

export const LANGUAGE_MAP: LANGUAGE_MAP = {
  "vi": "Vietnamese",
  "ja": "Japanese",
  "en": "English",
}

export const TEST_TYPE = {
  PRACTICE: "practice",
  EXAM: "exam"
} as const

export type TestType = typeof TEST_TYPE[keyof typeof TEST_TYPE]