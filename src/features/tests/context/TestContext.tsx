import { createContext, useContext, useReducer, useMemo } from "react"

export type ActiveQuestion = {
	part_id: number,
	question_id: number
}

export type TestState = {
	activePart: number
	activeQuestion: ActiveQuestion
	selectedAnswers: Record<string, string> // { questionId: answerId }
	isSubmitted: boolean
	timeRemaining: number
	timeLimit: number
}

type TestAction =
	| { type: 'SET_ACTIVE_PART', payload: ActiveQuestion }
	| { type: 'SET_ACTIVE_QUESTION', payload: ActiveQuestion }
	| { type: 'SET_SELECTED_ANSWERS', payload: Record<string, string> }
	| { type: 'SET_TIME_REMAINING'; payload: number }
	| { type: 'SUBMIT_TEST' }

const testReducer = (state: TestState, action: TestAction): TestState => {
	console.log('🔄 TestState Action:', action.type, 'payload' in action ? action.payload : 'no payload')
	console.log('📊 Previous State:', state)

	let newState: TestState

	switch (action.type) {
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
		case 'SET_TIME_REMAINING':
			newState = { ...state, timeRemaining: action.payload }
			break
		case 'SUBMIT_TEST':
			newState = { ...state, isSubmitted: true }
			break
		default:
			newState = state
	}

	console.log('✅ New State:', newState)
	console.log('-------------------')

	return newState
}

type TestContextType = {
	// State
	activePart: number
	activeQuestion: ActiveQuestion
	selectedAnswers: Record<string, string>
	isSubmitted: boolean
	timeRemaining: number
	timeLimit: number

	// Actions
	setActivePart: (part_id: number, question_id: number) => void
	setActiveQuestion: (activeQuestion: ActiveQuestion) => void
	setSelectedAnswer: (answers: Record<string, string>) => void
	setTimeRemaining: (time: number) => void
	submitTest: () => void
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
		activePart: state.activePart,
		activeQuestion: state.activeQuestion,
		selectedAnswers: state.selectedAnswers,
		isSubmitted: state.isSubmitted,
		timeRemaining: state.timeRemaining,
		timeLimit: state.timeLimit,

		// Actions
		setActivePart: (part_id: number, question_id: number) =>
			dispatch({ type: 'SET_ACTIVE_PART', payload: { part_id, question_id } }),

		setActiveQuestion: (activeQuestion: ActiveQuestion) =>
			dispatch({ type: 'SET_ACTIVE_QUESTION', payload: activeQuestion }),

		setSelectedAnswer: (answers: Record<string, string>) =>
			dispatch({ type: 'SET_SELECTED_ANSWERS', payload: answers }),

		setTimeRemaining: (time: number) =>
			dispatch({ type: 'SET_TIME_REMAINING', payload: time }),

		submitTest:
			() => dispatch({ type: 'SUBMIT_TEST' })
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
