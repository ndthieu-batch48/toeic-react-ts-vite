import { createContext, useContext, useRef } from "react"

type TestScrollContextType = {
	// Page refs and functions
	testPageRef: React.RefObject<Record<number, HTMLElement | null>>
	getTargetQuestionCardRef: (questionId: number) => HTMLDivElement | null
	setTargetQuestionCardRef: (questionId: number, element: HTMLDivElement | null) => void

}

const TestScrollContext = createContext<TestScrollContextType | null>(null)

export const TestScrollProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {

	const testPageRef: React.RefObject<Record<number, HTMLElement | null>> = useRef({});

	const getTargetQuestionCardRef = (questionId: number): HTMLDivElement | null => {
		return testPageRef.current[questionId] as HTMLDivElement | null;
	}

	const setTargetQuestionCardRef = (questionId: number, element: HTMLDivElement | null) => {
		testPageRef.current[questionId] = element;
	}

	const contextValue = {
		testPageRef,
		getTargetQuestionCardRef,
		setTargetQuestionCardRef,
	};


	return (
		<TestScrollContext.Provider value={contextValue}>
			{children}
		</TestScrollContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTestScrollContext = () => {
	const ctx = useContext(TestScrollContext)
	if (!ctx) {
		throw new Error('useTestScrollContext must be used within a TestScrollProvider')
	}
	return ctx
}