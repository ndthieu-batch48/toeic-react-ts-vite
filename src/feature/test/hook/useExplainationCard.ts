import { useState, useCallback } from "react";
import { useGeminiMutation } from "./useGeminiMutation";
import type { GeminiExplainQuesResp } from "../type/testServiceType";
import type { LANG_ID } from "../const/testConst";

export const useExplainationCard = () => {
  const { explainQuesMutation } = useGeminiMutation()

  const [explainScript, setExplainScript] = useState<Record<number, GeminiExplainQuesResp>>({});
  const [selectedLanguages, setSelectedLanguages] = useState<Record<number, LANG_ID>>({});

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

    // Language state and handlers
    getSelectedLanguage,
    handleSelectLanguage,

    // Explaination functions and state
    handlExplaination,
    isExplainPending: explainQuesMutation.isPending,
    isExplainError: explainQuesMutation.isError,
  }
}