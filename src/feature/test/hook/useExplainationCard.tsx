import { useState, useCallback } from "react";
import { useGeminiMutation } from "./useGeminiMutation";
import type { GeminiExplainQuesResp } from "../type/testServiceType";
import type { LANG_ID } from "../const/testConst";

export const useExplainationCard = () => {
	const { explainQuesMutation } = useGeminiMutation()

	const [explainScript, setExplainScript] = useState<Record<number, GeminiExplainQuesResp>>({});
	const [expandedCardMap, setExpandedCardMap] = useState<Record<number, boolean>>({}); // { questionId : true/false }
	const [selectedLanguages, setSelectedLanguages] = useState<Record<number, LANG_ID>>({});

	// Helper functions for expand state
	const isExplainCardExpanded = (questionId: number) => {
		return expandedCardMap[questionId]
	}

	const toggleExplainCardExpanded = (questionId: number) => {
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

	const handleSelectLanguage = (questionId: number, languageId: LANG_ID) => {
		setSelectedLanguages(prev => ({
			...prev,
			[questionId]: languageId
		}));
	}

	const handlExplaination = useCallback(async (questionId: number) => {
		const selectedLang = selectedLanguages[questionId];
		if (!selectedLang) return;

		const translation = await explainQuesMutation.mutateAsync({
			ques_id: questionId,
			lang_id: selectedLang
		});
		setExplainScript(prev => ({
			...prev,
			[questionId]: translation
		}));

	}, [selectedLanguages, explainQuesMutation]);

	return {
		explainScript,

		// Expand state and handlers
		isExplainCardExpanded,
		toggleExplainCardExpanded,

		// Language state and handlers
		getSelectedLanguage,
		handleSelectLanguage,

		// Explaination functions and state
		handlExplaination,
		isExplainPending: explainQuesMutation.isPending,
		isExplainError: explainQuesMutation.isError,
	}
}