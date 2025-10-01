import { createContext, useContext, useReducer, useMemo } from "react"

export type ActiveQuestion = {
	part_id: number,
	question_id: number
}

export type TestState = {
	testId: number
	testType: string
	activePart: number
	activeQuestion: ActiveQuestion
	selectedAnswers: Record<string, string> // { questionId: answerId }
	selectedParts: string[]
	remainingDuration: number
}

type TestAction =
	| { type: 'SET_TEST_ID', payload: number }
	| { type: 'SET_TEST_TYPE', payload: string }
	| { type: 'SET_ACTIVE_PART', payload: ActiveQuestion }
	| { type: 'SET_ACTIVE_QUESTION', payload: ActiveQuestion }
	| { type: 'SET_SELECTED_ANSWERS', payload: Record<string, string> }
	| { type: 'SET_SELECTED_PARTS', payload: string[] }
	| { type: 'SET_REMAINING_DURATION'; payload: number }

const testReducer = (state: TestState, action: TestAction): TestState => {
	let newState: TestState

	switch (action.type) {
		case 'SET_TEST_ID':
			newState = { ...state, testId: action.payload }
			break
		case 'SET_TEST_TYPE':
			newState = { ...state, testType: action.payload }
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
		case 'SET_REMAINING_DURATION':
			newState = { ...state, remainingDuration: action.payload }
			break
		default:
			newState = state
	}

	return newState
}

type TestContextType = {
	// State
	testId: number
	testType: string
	activePart: number
	activeQuestion: ActiveQuestion
	selectedAnswers: Record<string, string>
	selectedParts: string[]
	remainingDuration: number

	// Actions
	setTestId: (testId: number) => void
	setTestType: (testType: string) => void
	setActivePart: (part_id: number, question_id: number) => void
	setActiveQuestion: (activeQuestion: ActiveQuestion) => void
	setSelectedAnswer: (answers: Record<string, string>) => void
	setSelectedParts: (parts: string[]) => void
	setRemainingDuration: (duration: number) => void
}

const TestContext = createContext<TestContextType | null>(null)

export const TestProvider = ({
	children,
	initialState
}: {
	children: React.ReactNode
	initialState: TestState
}) => {
	const [state, dispatch] = useReducer(testReducer, initialState)

	const contextValue = useMemo(() => ({
		// State
		testId: state.testId,
		testType: state.testType,
		activePart: state.activePart,
		activeQuestion: state.activeQuestion,
		selectedAnswers: state.selectedAnswers,
		selectedParts: state.selectedParts,
		remainingDuration: state.remainingDuration,

		// Actions
		setTestId: (testId: number) =>
			dispatch({ type: 'SET_TEST_ID', payload: testId }),

		setTestType: (testType: string) =>
			dispatch({ type: 'SET_TEST_TYPE', payload: testType }),

		setActivePart: (part_id: number, question_id: number) =>
			dispatch({ type: 'SET_ACTIVE_PART', payload: { part_id, question_id } }),

		setActiveQuestion: (activeQuestion: ActiveQuestion) =>
			dispatch({ type: 'SET_ACTIVE_QUESTION', payload: activeQuestion }),

		setSelectedAnswer: (answers: Record<string, string>) =>
			dispatch({ type: 'SET_SELECTED_ANSWERS', payload: answers }),

		setSelectedParts: (parts: string[]) =>
			dispatch({ type: 'SET_SELECTED_PARTS', payload: parts }),

		setRemainingDuration: (duration: number) =>
			dispatch({ type: 'SET_REMAINING_DURATION', payload: duration }),

	}), [state])

	return (
		<TestContext.Provider value={contextValue}>
			{children}
		</TestContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTestContext = () => {
	const ctx = useContext(TestContext)
	if (!ctx) throw new Error("useTestContext must be used inside <TestProvider>")
	return ctx
}
