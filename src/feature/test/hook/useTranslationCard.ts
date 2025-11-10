import { useState, useCallback } from "react";
import { useGeminiMutation } from "./useGeminiMutation";
import type { GeminiTransQuesResp } from "../type/testServiceType";
import type { LANG_ID } from "../const/testConst";

export const useTranslationCard = () => {
  const { transQuesMutation } = useGeminiMutation()

  const [translateScript, setTranslateScript] = useState<Record<number, GeminiTransQuesResp>>({});
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

  const handleTranslation = useCallback(async (questionId: number) => {
    const selectedLang = selectedLanguages[questionId];
    if (!selectedLang) return;

    const translation = await transQuesMutation.mutateAsync({
      ques_id: questionId,
      lang_id: selectedLang
    });
    setTranslateScript(prev => ({
      ...prev,
      [questionId]: translation
    }));

  }, [selectedLanguages, transQuesMutation]);

  return {
    translateScript,

    // Language state and handlers
    getSelectedLanguage,
    handleSelectLanguage,

    // Translation functions and state
    handleTranslation,
    isTranslatePending: transQuesMutation.isPending,
    isTranslateError: transQuesMutation.isError,
  }
}