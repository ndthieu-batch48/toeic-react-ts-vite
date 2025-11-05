import type { MediaQuesDetailRes } from "@/feature/test/type/testServiceType"

export const mediaQuestionSorter = (mediaQuestion: MediaQuesDetailRes[]) => {
  return [...mediaQuestion].sort((a, b) => {
    // Extract first number from media_name like "<p>186-190</p>" -> 186
    const aText = a.media_ques_name.replace(/<[^>]*>/g, '')
    const bText = b.media_ques_name.replace(/<[^>]*>/g, '')

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