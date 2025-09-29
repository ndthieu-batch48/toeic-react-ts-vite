import type { MediaQuestion } from "../types/test"

export const mediaQuestionSorter = (mediaQuestion: MediaQuestion[]) => {
	return [...mediaQuestion].sort((a, b) => {
		// Extract first number from media_name like "<p>186-190</p>" -> 186
		const aText = a.media_name.replace(/<[^>]*>/g, '')
		const bText = b.media_name.replace(/<[^>]*>/g, '')

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