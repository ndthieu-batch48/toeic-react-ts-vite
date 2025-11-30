import { createContext, useContext, useReducer, useMemo } from "react"
import type { TestType } from "../const/testConst"

export type ActiveQuestion = {
	part_id: number,
	question_id: number
}

export type TestState = {
	testId: number
	testType: TestType
	activePart: number
	activeQuestion: ActiveQuestion
	selectedAnswers: Record<string, string> // { questionId: answerId }
	selectedParts: string[]
	practiceDuration: number // count up from 0 (in seconds)
	examDuration: number // count down from initial time limit (in seconds)
	isSubmitting: boolean
	isSaving: boolean
	isClose: boolean
}

type TestAction =
	| { type: 'SET_TEST_ID', payload: number }
	| { type: 'SET_TEST_TYPE', payload: TestType }
	| { type: 'SET_ACTIVE_PART', payload: ActiveQuestion }
	| { type: 'SET_ACTIVE_QUESTION', payload: ActiveQuestion }
	| { type: 'SET_SELECTED_ANSWERS', payload: Record<string, string> }
	| { type: 'SET_SELECTED_PARTS', payload: string[] }
	| { type: 'SET_PRACTICE_DURATION'; payload: number }
	| { type: 'SET_EXAM_DURATION'; payload: number }
	| { type: 'SET_IS_SUBMITTING'; payload: boolean }
	| { type: 'SET_IS_SAVING'; payload: boolean }
	| { type: 'SET_IS_CLOSE'; payload: boolean }


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
		case 'SET_PRACTICE_DURATION':
			newState = { ...state, practiceDuration: action.payload }
			break
		case 'SET_EXAM_DURATION':
			newState = { ...state, examDuration: action.payload }
			break
		case 'SET_IS_SUBMITTING':
			newState = { ...state, isSubmitting: action.payload }
			break
		case 'SET_IS_SAVING':
			newState = { ...state, isSaving: action.payload }
			break
		case 'SET_IS_CLOSE':
			newState = { ...state, isClose: action.payload }
			break
		default:
			newState = state
	}

	return newState
}

type TestContextType = {
	// State
	testId: number
	testType: TestType
	activePart: number
	activeQuestion: ActiveQuestion
	selectedAnswers: Record<string, string>
	selectedParts: string[]
	practiceDuration: number
	examDuration: number
	isSubmitting: boolean
	isSaving: boolean
	isClose: boolean

	// Actions
	setTestId: (testId: number) => void
	setTestType: (testType: TestType) => void
	setActivePart: (part_id: number, question_id: number) => void
	setActiveQuestion: (activeQuestion: ActiveQuestion) => void
	setSelectedAnswer: (answers: Record<string, string>) => void
	setSelectedParts: (parts: string[]) => void
	setPracticeDuration: (duration: number) => void
	setExamDuration: (duration: number) => void
	setIsSubmitting: (action: boolean) => void
	setIsSaving: (action: boolean) => void
	setIsClose: (action: boolean) => void
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
		practiceDuration: state.practiceDuration,
		examDuration: state.examDuration,
		isSubmitting: state.isSubmitting,
		isSaving: state.isSaving,
		isClose: state.isClose,

		// Actions
		setTestId: (testId: number) =>
			dispatch({ type: 'SET_TEST_ID', payload: testId }),

		setTestType: (testType: TestType) =>
			dispatch({ type: 'SET_TEST_TYPE', payload: testType }),

		setActivePart: (part_id: number, question_id: number) =>
			dispatch({ type: 'SET_ACTIVE_PART', payload: { part_id, question_id } }),

		setActiveQuestion: (activeQuestion: ActiveQuestion) =>
			dispatch({ type: 'SET_ACTIVE_QUESTION', payload: activeQuestion }),

		setSelectedAnswer: (answers: Record<string, string>) =>
			dispatch({ type: 'SET_SELECTED_ANSWERS', payload: answers }),

		setSelectedParts: (parts: string[]) =>
			dispatch({ type: 'SET_SELECTED_PARTS', payload: parts }),

		setPracticeDuration: (duration: number) =>
			dispatch({ type: 'SET_PRACTICE_DURATION', payload: duration }),

		setExamDuration: (duration: number) =>
			dispatch({ type: 'SET_EXAM_DURATION', payload: duration }),

		setIsSubmitting: (action: boolean) =>
			dispatch({ type: 'SET_IS_SUBMITTING', payload: action }),

		setIsSaving: (action: boolean) =>
			dispatch({ type: 'SET_IS_SAVING', payload: action }),

		setIsClose: (action: boolean) =>
			dispatch({ type: 'SET_IS_CLOSE', payload: action })

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