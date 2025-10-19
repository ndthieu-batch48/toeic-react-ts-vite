import type { MediaQuesDetailRes } from "../types/test"

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