import { createContext, useContext, useRef } from "react"
import { useTestContext } from "./TestContext"

type TestScrollContextType = {
	// Page refs and functions
	testPageRef: React.RefObject<Record<number, HTMLElement | null>>
	getScrollTarget: (questionId: number) => HTMLDivElement | null
	setScrollTarget: (questionId: number, element: HTMLDivElement | null) => void

}

const TestScrollContext = createContext<TestScrollContextType | null>(null)

export const TestScrollProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const { testType } = useTestContext()
	const testPageRef: React.RefObject<Record<number, HTMLElement | null>> = useRef({});

	const getScrollTarget = (questionId: number): HTMLDivElement | null => {
		if (testType === "exam") return null;

		return testPageRef.current[questionId] as HTMLDivElement | null;
	}

	const setScrollTarget = (questionId: number, element: HTMLDivElement | null) => {
		if (testType === "exam") return null;

		testPageRef.current[questionId] = element;
	}

	const contextValue = {
		testPageRef,
		getScrollTarget,
		setScrollTarget,
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