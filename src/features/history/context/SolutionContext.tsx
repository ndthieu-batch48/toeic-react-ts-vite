import { createContext, useContext, useReducer, useMemo } from "react"

export type ActiveQuestion = {
	part_id: number,
	question_id: number
}

export type SolutionState = {
	testId: number
	activePart: number
	activeQuestion: ActiveQuestion
	selectedAnswers: Record<string, string> // { questionId: answerId }
	selectedParts: string[]
}

type SolutionAction =
	| { type: 'SET_TEST_ID', payload: number }
	| { type: 'SET_ACTIVE_PART', payload: ActiveQuestion }
	| { type: 'SET_ACTIVE_QUESTION', payload: ActiveQuestion }
	| { type: 'SET_SELECTED_ANSWERS', payload: Record<string, string> }
	| { type: 'SET_SELECTED_PARTS', payload: string[] }

const solutionReducer = (state: SolutionState, action: SolutionAction): SolutionState => {
	let newState: SolutionState

	switch (action.type) {
		case 'SET_TEST_ID':
			newState = { ...state, testId: action.payload }
			break
		case 'SET_ACTIVE_PART':
			newState = { ...state, activePart: action.payload.part_id, activeQuestion: action.payload }
			break
		case 'SET_ACTIVE_QUESTION':
			newState = { ...state, activeQuestion: action.payload }
			break
		case 'SET_SELECTED_ANSWERS':
			newState = {
				...state,
				selectedAnswers: {
					...state.selectedAnswers,
					...action.payload
				}
			}
			break
		case 'SET_SELECTED_PARTS':
			newState = { ...state, selectedParts: action.payload }
			break
		default:
			newState = state
	}

	return newState
}

type SolutionContextType = {
	// State
	testId: number
	activePart: number
	activeQuestion: ActiveQuestion
	selectedAnswers: Record<string, string>
	selectedParts: string[]

	// Actions
	setTestId: (testId: number) => void
	setActivePart: (part_id: number, question_id: number) => void
	setActiveQuestion: (activeQuestion: ActiveQuestion) => void
	setSelectedAnswer: (answers: Record<string, string>) => void
	setSelectedParts: (parts: string[]) => void
}

const SolutionContext = createContext<SolutionContextType | null>(null)

export const SolutionProvider = ({
	children,
	initialState
}: {
	children: React.ReactNode
	initialState: SolutionState
}) => {
	const [state, dispatch] = useReducer(solutionReducer, initialState)

	const contextValue = useMemo(() => ({
		// State
		testId: state.testId,
		activePart: state.activePart,
		activeQuestion: state.activeQuestion,
		selectedAnswers: state.selectedAnswers,
		selectedParts: state.selectedParts,

		// Actions
		setTestId: (testId: number) =>
			dispatch({ type: 'SET_TEST_ID', payload: testId }),

		setActivePart: (part_id: number, question_id: number) =>
			dispatch({ type: 'SET_ACTIVE_PART', payload: { part_id, question_id } }),

		setActiveQuestion: (activeQuestion: ActiveQuestion) =>
			dispatch({ type: 'SET_ACTIVE_QUESTION', payload: activeQuestion }),

		setSelectedAnswer: (answers: Record<string, string>) =>
			dispatch({ type: 'SET_SELECTED_ANSWERS', payload: answers }),

		setSelectedParts: (parts: string[]) =>
			dispatch({ type: 'SET_SELECTED_PARTS', payload: parts }),

	}), [state])

	return (
		<SolutionContext.Provider value={contextValue}>
			{children}
		</SolutionContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSolutionContext = () => {
	const ctx = useContext(SolutionContext)
	if (!ctx) throw new Error("useSolutionContext must be used inside <SolutionProvider>")
	return ctx
}
