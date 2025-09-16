import { createContext, useContext } from "react"

export type ActiveQuestion = {
	part_id: number
	question_id: number
}

type QuestionContextType = {
	activeQuestion: ActiveQuestion
	setActiveQuestion: (q: ActiveQuestion) => void
}

const QuestionContext = createContext<QuestionContextType | null>(null)

export const QuestionProvider = QuestionContext.Provider

// eslint-disable-next-line react-refresh/only-export-components
export const useQuestionContext = () => {
	const ctx = useContext(QuestionContext)
	if (!ctx) throw new Error("useQuestionContext must be used inside <QuestionProvider>")
	return ctx
}
