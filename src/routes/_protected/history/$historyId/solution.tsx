import { SolutionPage } from '@/features/history/pages/SolutionPage';
import { SolutionProvider, type SolutionState } from '@/features/history/context/SolutionContext';
import { SolutionScrollProvider } from '@/features/history/context/SolutionScrollContext';
import { mediaQuestionSorter } from '@/features/tests/helper/testHelper';
import { useGetTestDetail } from '@/features/tests/hooks/userTestApi';
import { createFileRoute } from '@tanstack/react-router'
import { useGetHistoryResultDetail } from '@/features/history/hooks/useHistoryApi';
import z from 'zod';

const searchSchema = z.object({
	testId: z.number(),

})
export const Route = createFileRoute('/_protected/history/$historyId/solution')({
	validateSearch: searchSchema,
	component: SolutionRoute,
})

function SolutionRoute() {
	const { historyId } = Route.useParams();
	const { testId } = Route.useSearch();
	const { data: historyData, isLoading: historyLoading, error: historyError } = useGetHistoryResultDetail(Number(historyId))
	const { data: testData, isLoading: testLoading, error: testError } = useGetTestDetail(testId);

	// Show loading if either request is loading
	if (historyLoading || testLoading) {
		return <div className="text-center text-foreground">Loading...</div>;
	}

	// Show error if either request has an error
	if (historyError) {
		return <div className="text-center text-destructive">Error loading history: {historyError.message}</div>;
	}

	if (testError) {
		return <div className="text-center text-destructive">Error loading test: {testError.message}</div>;
	}

	// Check if data exists
	if (!historyData || !testData) {
		return <div className="text-center text-foreground">No data available</div>;
	}

	const selectedPartIds = historyData.part_id_list.map((part) => Number(part))

	// Filter parts based on selectedPartIds, then sort the media_list
	const sortedParts = testData.part_list
		.filter((part) => selectedPartIds?.includes(part.part_id))
		.map((part) => ({
			...part,
			media_list: part.media_list ? mediaQuestionSorter(part.media_list) : []
		}))

	// Check if sortedParts is empty
	if (sortedParts.length === 0) {
		return <div className="text-center text-foreground">No test parts found</div>;
	}

	const initialActive = (() => {
		const part = sortedParts[0]
		const questionId = part?.media_list?.[0]?.question_list?.[0]?.question_id ?? 0
		return { part_id: part?.part_id ?? 0, question_id: questionId }
	})()

	const initialState: SolutionState = {
		testId: historyData.test_id,
		activePart: initialActive.part_id,
		activeQuestion: initialActive,
		selectedAnswers: historyData.dataprogress ?? {},
		selectedParts: [],
	}

	return (
		<SolutionProvider initialState={initialState}>
			<SolutionScrollProvider>
				<SolutionPage
					detailHistory={historyData}
					partData={sortedParts}
				/>
			</SolutionScrollProvider>
		</SolutionProvider>
	)
}
