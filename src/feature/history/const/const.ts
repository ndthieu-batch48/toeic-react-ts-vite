// History Feature Text Constants
export const HISTORY_TEXTS = {
  // All History Section
  TEST_HISTORY_TITLE: "Test History",
  TEST_HISTORY_DESCRIPTION: "Review your previous test attempts and results",
  FAILED_STATUS: "Failed",
  PASSED_STATUS: "Passed",
  COMPLETED_AT_LABEL: "Completed at:",
  OVERALL_SCORE_LABEL: "Overall score:",
  VIEW_DETAILS_RESULT_BUTTON: "View Details Result",

  // Result Page
  TOEIC_TEST_RESULTS_TITLE: "TOEIC Test Results",
  TEST_SUFFIX: "Test",
  OVERALL_SCORE_TITLE: "Overall Score",
  ACCURACY_RATE_TEXT: "Accuracy Rate",
  QUESTIONS_ANSWERED_TITLE: "Questions Answered",
  TEST_DURATION_TITLE: "Test Duration",
  DETAILED_RESULTS_TITLE: "Detailed Results",
  OVERALL_PROGRESS_TEXT: "Overall Progress",
  ANSWER_SUMMARY_TITLE: "Answer Summary",
  CORRECT_ANSWERS_TEXT: "Correct Answers",
  INCORRECT_ANSWERS_TEXT: "Incorrect Answers",
  NO_ANSWER_TEXT: "No Answer",
  SECTION_BREAKDOWN_TITLE: "Section Breakdown",
  LISTENING_SECTION_TEXT: "Listening",
  READING_SECTION_TEXT: "Reading",
  CORRECT_TEXT: "correct",
  TEST_INFORMATION_TITLE: "Test Information",
  TEST_DATE_LABEL: "Test Date:",
  DURATION_LABEL: "Duration:",
  PERFORMANCE_INSIGHTS_TITLE: "Performance Insights",
  LISTENING_SECTION_TITLE: "Listening Section",
  READING_SECTION_TITLE: "Reading Section",
  CORRECT_ANSWERS_LABEL: "Correct Answers",
  VIEW_DETAIL_SOLUTION_BUTTON: "View Detail Solution",
  MINUTES_SUFFIX: "m",
  SECONDS_SUFFIX: "s",
  OF_TEXT: "of",
  TOTAL_TEXT: "total",

  // Solution Page
  EXIT_BUTTON_TEXT: "Exit",

  // Solution Question Components
  QUESTION_PREFIX: "Question",
  QUESTIONS_PREFIX: "Questions",
  REFER_TO_FOLLOWING_TEXT: "refer to the following",
  SELECT_YOUR_ANSWER_TEXT: "Select your answer:",

  // Solution Part Tabs
  AUDIO_PLACEHOLDER_TEXT: "this-is-just-a-text",
} as const;

// Date and Time Formatting
export const DATE_TIME_FORMAT = {
  LOCALE: 'en-US' as const,
  OPTIONS: {
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const,
    hour: '2-digit' as const,
    minute: '2-digit' as const,
  },
} as const;

// Configuration Constants
export const HISTORY_CONFIG = {
  // Score calculation
  PASSING_SCORE_RATIO: 0.5,
  PERCENTAGE_MULTIPLIER: 100,
  SECONDS_PER_MINUTE: 60,
  MAX_SCORE_REFERENCE: 100,

  // Grid and layout
  GRID_COLUMNS_SM: 1,
  GRID_COLUMNS_MD: 2,
  GRID_COLUMNS_LG: 3,

  // Card dimensions
  MAX_CARD_WIDTH: 350,
} as const;
