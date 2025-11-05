import { useState, useCallback } from "react";
import { useGeminiMutation } from "./useGeminiMutation";
import type { GeminiTransQuesResp } from "../type/testServiceType";
import type { LANG_ID } from "../const/testConst";

export const useTranslationCard = () => {
  const { transQuesMutation } = useGeminiMutation()

  const [translateScript, setTranslateScript] = useState<Record<number, GeminiTransQuesResp>>({});
  const [expandedCardMap, setExpandedCardMap] = useState<Record<number, boolean>>({}); // { questionId : true/false }
  const [selectedLanguages, setSelectedLanguages] = useState<Record<number, LANG_ID>>({});

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

    // Expand state and handlers
    isTranslateCardExpanded,
    toggleTranslateCardExpanded,

    // Language state and handlers
    getSelectedLanguage,
    handleSelectLanguage,

    // Translation functions and state
    handleTranslation,
    isTranslatePending: transQuesMutation.isPending,
    isTranslateError: transQuesMutation.isError,
  }
}