import { SolutionPage } from '@/features/history/pages/solution-page';
import { SolutionProvider ,type SolutionState } from '@/features/history/context/SolutionContext';
import { mediaQuestionSorter } from '@/features/tests/helper/testHelper';
import { useGetTestDetail } from '@/features/tests/hooks/userTestApi';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import { useGetHistoryResultDetail } from '@/features/history/hooks/useHistoryApi';

const searchSchema = z.object({
	belongToTestId: z.string(),
	isFailed: z.boolean(),
})

export const Route = createFileRoute('/_protected/history/$historyId/solution')({
		validateSearch: searchSchema,
    component: SolutionRoute,
  })

function SolutionRoute() {
	const { historyId } = Route.useParams();
	const { belongToTestId, isFailed } = Route.useSearch();
	const { data: historyData, isLoading: historyLoading, error: historyError } = useGetHistoryResultDetail(Number(historyId))
	const { data: testData, isLoading: testLoading, error: testError } = useGetTestDetail(Number(belongToTestId));
	
	// Show loading if either request is loading
	if (historyLoading || testLoading) {
		return <div className="text-center text-foreground font-sans">Loading...</div>;
	}
	
	// Show error if either request has an error
	if (historyError) {
		return <div className="text-center text-destructive font-sans">Error loading history: {historyError.message}</div>;
	}
	
	if (testError) {
		return <div className="text-center text-destructive font-sans">Error loading test: {testError.message}</div>;
	}

	// Check if data exists
	if (!historyData || !testData) {
		return <div className="text-center text-foreground font-sans">No data available</div>;
	}

	const selectedPartIds = historyData.part_list.map((part) => Number(part))

	// Filter parts based on selectedPartIds, then sort the media_list
	const sortedParts = testData.part_list
		.filter((part) => selectedPartIds?.includes(part.part_id))
		.map((part) => ({
			...part,
			media_list: part.media_list ? mediaQuestionSorter(part.media_list) : []
		}))

	// Check if sortedParts is empty
	if (sortedParts.length === 0) {
		return <div className="text-center text-foreground font-sans">No test parts found</div>;
	}

	const initialActive = (() => {
		const part = sortedParts[0]
		const questionId = part?.media_list?.[0]?.question_list?.[0]?.question_id ?? 0
		return { part_id: part?.part_id ?? 0, question_id: questionId }
	})()

	const initialState: SolutionState = {
		testId: Number(belongToTestId),
		activePart: initialActive.part_id,
		activeQuestion: initialActive,
		selectedAnswers: historyData.dataprogress ?? {},
		selectedParts: [],
	}

	return (
		<SolutionProvider initialState={initialState}>
			<SolutionPage
				testTitle={testData.test_title}
				partData={sortedParts}
				isFailed={isFailed}
			/>
		</SolutionProvider>
	)
}
