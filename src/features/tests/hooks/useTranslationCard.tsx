import { useState, useCallback } from "react";
import { useGeminiTranslateQuestion } from "./userTestApi";
import type { TranslateQuestionResponse } from "../types/test";
import type { LANGUAGE_ID } from "../constants/const";

export const useTranslationCard = () => {
	const translateMutation = useGeminiTranslateQuestion()
	const [translateScript, setTranslateScript] = useState<Record<number, TranslateQuestionResponse>>({});
	const [expandedCardMap, setExpandedCardMap] = useState<Record<number, boolean>>({}); // { questionId : true/false }
	const [selectedLanguages, setSelectedLanguages] = useState<Record<number, LANGUAGE_ID>>({});

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
				// Set default language when expanding for the first time
				if (!selectedLanguages[questionId]) {
					setSelectedLanguages(prevLang => ({
						...prevLang,
						[questionId]: 'vi'
					}));
				}
			}

			return newMap
		});
	};

	// Helper function for selecting language state
	const getSelectedLanguage = (questionId: number) => {
		return selectedLanguages[questionId]
	}

	const handleSelectLanguage = (questionId: number, languageId: LANGUAGE_ID) => {
		setSelectedLanguages(prev => ({
			...prev,
			[questionId]: languageId
		}));
	}

	const handleTranslation = useCallback(async (questionId: number) => {
		const selectedLang = selectedLanguages[questionId];
		if (!selectedLang) return;

		const translation = await translateMutation.mutateAsync({
			question_id: questionId,
			language_id: selectedLang
		});
		setTranslateScript(prev => ({
			...prev,
			[questionId]: translation
		}));

	}, [selectedLanguages, translateMutation]);

	return {
		translateScript,

		// Expand state and handlers
		isTranslateCardExpanded,
		toggleTranslateCardExpanded,

		// Language state and handlers
		getSelectedLanguage,
		handleSelectLanguage,

		// Translation functions and state
		handleTranslation,
		isTranslatePending: translateMutation.isPending,
		isTranslateError: translateMutation.isError,
	}
}