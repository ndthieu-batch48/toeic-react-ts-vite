import type { MediaQuestionDetailResponse, AnswerDetailResponse } from "../type/testServiceType"
import { getStorageItem, setStorageItem, removeStorageItem } from "@/common/util/localStorageUtil"

export const mediaQuestionSorter = (mediaQuestion: MediaQuestionDetailResponse[]) => {
  return [...mediaQuestion].sort((a, b) => {
    // Extract first number from media_name like "<p>186-190</p>" -> 186
    const aText = a.media_question_name.replace(/<[^>]*>/g, '')
    const bText = b.media_question_name.replace(/<[^>]*>/g, '')

    const aNumber = parseInt(aText.split('-')[0])
    const bNumber = parseInt(bText.split('-')[0])

    return aNumber - bNumber
  })
}

export const isMainParagraphHasContent = (mainParagraph: string): boolean => {
  if (!mainParagraph || mainParagraph.trim() === '') {
    return false;
  }

  // Check if content is just a paragraph with number ranges or single numbers
  // Pattern matches: <p>number</p>, <p>number-number</p>, <p>number - number</p>, etc.
  const numberRangePattern = /^<p>\s*\d+(\s*-\s*\d+)?\s*<\/p>$/i;
  if (numberRangePattern.test(mainParagraph.trim())) {
    return false;
  }

  return true;
}

// Duration helper functions - Save and restore practice duration
export const savePracticeDuration = (testId: number, duration: number) => {
  const key = `practice_duration_test_${testId}`;
  setStorageItem(key, duration.toString());
}

export const getPracticeDuration = (testId: number): number => {
  const key = `practice_duration_test_${testId}`;
  const duration = getStorageItem(key);
  return duration ? parseInt(duration) : 0;
}

export const clearPracticeDuration = (testId: number): void => {
  try {
    removeStorageItem(`practice_duration_test_${testId}`);
  } catch (error) {
    console.error('Failed to clear test durations:', error);
  }
}

export const getToeicPartTopic = (partOrder: string): string => {

  const partTopicMap = [
    { partOrder: 'Part 1', topicName: 'Photographs' },
    { partOrder: 'Part 2', topicName: 'Question Response' },
    { partOrder: 'Part 3', topicName: 'Conversations' },
    { partOrder: 'Part 4', topicName: 'Talks' },
    { partOrder: 'Part 5', topicName: 'Incomplete Sentences' },
    { partOrder: 'Part 6', topicName: 'Text Completion' },
    { partOrder: 'Part 7', topicName: 'Reading Comprehension' }
  ];

  const normalizedInput = partOrder.toLowerCase().replace(/\s+/g, '');
  const part = partTopicMap.find(p => p.partOrder.toLowerCase().replace(/\s+/g, '') === normalizedInput);
  return part ? part.topicName : '';
}

export const getToeicPartDescription = (partOrder: string): string => {

  const partDescriptionMap = [
    { partOrder: 'Part 1', description: 'You will view photographs and select the statement that best describes what you see in each image.' },
    { partOrder: 'Part 2', description: 'You will hear a question or statement and choose the most appropriate response from three options.' },
    { partOrder: 'Part 3', description: 'You will listen to conversations between two or more speakers and answer three questions about each dialogue.' },
    { partOrder: 'Part 4', description: 'You will hear short monologues such as announcements or messages and answer three questions about each talk.' },
    { partOrder: 'Part 5', description: 'You will complete sentences by selecting the correct word or phrase from four options.' },
    { partOrder: 'Part 6', description: 'You will fill in missing words or sentences within texts such as emails, articles, or notices.' },
    { partOrder: 'Part 7', description: 'You will read single and multiple passages and answer questions that test your understanding of the content.' }
  ];

  const normalizedInput = partOrder.toLowerCase().replace(/\s+/g, '');
  const part = partDescriptionMap.find(p => p.partOrder.toLowerCase().replace(/\s+/g, '') === normalizedInput);
  return part ? part.description : '';
}

export const saveAudioPlaybackPosition = (testId: number, partId: number, position: number) => {
  const key = `audio_playback_position_test_${testId}_part_${partId}`;
  setStorageItem(key, position.toString());
}

export const getAudioPlaybackPosition = (testId: number, partId: number): number => {
  const key = `audio_playback_position_test_${testId}_part_${partId}`;
  const position = getStorageItem(key);
  return position ? parseFloat(position) : 0;
}

export const clearAudioPlaybackPosition = (testId: number, partId: number): boolean => {
  const key = `audio_playback_position_test_${testId}_part_${partId}`;
  return removeStorageItem(key);
}

export const clearAllAudioPlaybackPosition = (testId: number): void => {
  try {
    const keys = Object.keys(localStorage);
    const prefix = `audio_playback_position_test_${testId}_part_`;
    keys.forEach(key => {
      if (key.startsWith(prefix)) {
        removeStorageItem(key);
      }
    });
  } catch (error) {
    console.error('Failed to clear all audio playback positions:', error);
  }
}

// Helper function to check if content is empty or only contains single letters
export const isContentMeaningless = (content: string): boolean => {
  const trimmed = content.trim()
  // Check if empty or only contains A, B, C, D (single letter)
  return trimmed === '' || /^[A-D]$/i.test(trimmed)
}

// Helper function to check if question and all answers are meaningless
export const hasNoMeaningfulContent = (questionContent: string, answerList: AnswerDetailResponse[]): boolean => {
  const questionMeaningless = isContentMeaningless(questionContent)
  const allAnswersMeaningless = answerList.every(answer =>
    isContentMeaningless(answer.content)
  )
  return questionMeaningless && allAnswersMeaningless
}

// Helper function to check if GeminiAssistCard should be shown
export const shouldShowGeminiAssistButton = (audioScript: string | undefined, questionContent: string, answerList: AnswerDetailResponse[]): boolean => {
  const shouldHideTranslateExplain = hasNoMeaningfulContent(questionContent, answerList)
  const hasAnyFeature = !shouldHideTranslateExplain || !!audioScript
  return hasAnyFeature
}