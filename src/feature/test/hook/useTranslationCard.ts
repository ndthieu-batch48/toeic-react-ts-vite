import { useState, useCallback } from "react";
import { useTranslateQuestion } from "./useTranslateQuestion";
import type { GeminiTransQuesResp } from "../type/testType";
import type { LANG_ID } from "../const/testConst";

export const useTranslationCard = () => {
  const translateMutation = useTranslateQuestion()

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

    const translation = await translateMutation.mutateAsync({
      ques_id: questionId,
      lang_id: selectedLang
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