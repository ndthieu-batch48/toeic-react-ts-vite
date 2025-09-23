import { useState, useCallback } from "react";
import { useGeminiTranslateQuestion } from "./userTestApi";
import type { TranslateQuestionResponse } from "../types/test";

export const useTranslationCard = () => {
	const translateMutation = useGeminiTranslateQuestion()
	const [translateScript, setTranslateScript] = useState<Record<number, TranslateQuestionResponse>>({});
	const [expandedCardMap, setExpandedCardMap] = useState<Record<number, boolean>>({}); // { questionId : true/false }
	const [selectedLanguages, setSelectedLanguages] = useState<Record<number, string>>({});

	// Helper functions for expand state
	const isTranslateCardExpanded = (questionId: number) => {
		return expandedCardMap[questionId]
	}
	
	const toggleTranslateCardExpanded = (questionId: number) => {
		setExpandedCardMap(prev => {
			const newMap = { ...prev }
			
			if (newMap[questionId]) {
				newMap[questionId] = false;
			} else {
				newMap[questionId] = true;
			}

			return newMap
		});
	};

	// Helper function for selecting language state
	const getSelectedLanguage = (questionId: number) => {
		return selectedLanguages[questionId]
	}

	// Function to translate a question
	const translateQuestion = useCallback(async (questionId: number, languageId: number) => {
		try {
			const result = await translateMutation.mutateAsync({
				question_id: questionId,
				language_id: languageId
			});
			
			// Store the translated content
			setTranslateScript(prev => ({
				...prev,
				[questionId]: result
			}));
			
			return result;
		} catch (error) {
			console.error('Translation failed:', error);
			throw error;
		}
	}, [translateMutation]);
	
	const handleSelectLanguage = (questionId: number, languageId: string) => {
		setSelectedLanguages(prev => ({
        ...prev,
        [questionId]: languageId
		}));
		
		console.log(selectedLanguages)
	}

	// Manual translate function to be called by the translate button
	const handleManualTranslate = useCallback((questionId: number) => {
		const selectedLang = selectedLanguages[questionId];
		if (!selectedLang) return;

		// Convert language string to language ID and call translation
		const languageMap: Record<string, number> = {
			'vi': 0, // Vietnamese
			'ja': 1, // Japanese
			'en': 2  // English
		};
		
		const langId = languageMap[selectedLang];
		if (langId !== undefined && langId !== 2) { // Don't translate if English
			translateQuestion(questionId, langId);
		}
	}, [selectedLanguages, translateQuestion]);

	return {
		translateScript,

		// Expand state and handlers
		isTranslateCardExpanded,
		toggleTranslateCardExpanded,

		// Language state and handlers
		getSelectedLanguage,
		handleSelectLanguage,

		// Translation functions and state
		translateQuestion,
		handleManualTranslate,
		isTranslating: translateMutation.isPending,
		translationError: translateMutation.error
	}
}