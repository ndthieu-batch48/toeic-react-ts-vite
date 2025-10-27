import { createContext, useContext, useRef } from "react"

type SolutionScrollContextType = {
	// Page refs and functions
	solutionPageRef: React.RefObject<Record<number, HTMLElement | null>>
	getScrollTarget: (questionId: number) => HTMLDivElement | null
	setScrollTarget: (questionId: number, element: HTMLDivElement | null) => void

}

const SolutionScrollContext = createContext<SolutionScrollContextType | null>(null)

export const SolutionScrollProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {

	const solutionPageRef: React.RefObject<Record<number, HTMLElement | null>> = useRef({});

	const getScrollTarget = (questionId: number): HTMLDivElement | null => {
		return solutionPageRef.current[questionId] as HTMLDivElement | null;
	}

	const setScrollTarget = (questionId: number, element: HTMLDivElement | null) => {
		solutionPageRef.current[questionId] = element;
	}

	const contextValue = {
		solutionPageRef,
		getScrollTarget,
		setScrollTarget,
	};


	return (
		<SolutionScrollContext.Provider value={contextValue}>
			{children}
		</SolutionScrollContext.Provider>
	)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSolutionScrollContext = () => {
	const ctx = useContext(SolutionScrollContext)
	if (!ctx) {
		throw new Error('useSolutionScrollContext must be used within a SolutionScrollProvider')
	}
	return ctx
}