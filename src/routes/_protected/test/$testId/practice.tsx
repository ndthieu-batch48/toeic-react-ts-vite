import { TestProvider, type TestState } from '@/features/tests/context/TestContext';
import { TestScrollProvider } from '@/features/tests/context/TestScrollContext';
import { mediaQuestionSorter } from '@/features/tests/helper/testHelper';
import { useGetTestDetail } from '@/features/tests/hooks/userTestApi';
import { TestPracticePage } from '@/features/tests/pages/TestPracticePage';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';

const searchSchema = z.object({
	type: z.string(),
	selectedPartIds: z.array(z.number()),
	selectedAnswers: z.record(z.string(), z.string()).optional(),
	timeLimit: z.number(),
})

export const Route = createFileRoute('/_protected/test/$testId/practice')({
	validateSearch: searchSchema,
	component: TestPracticeRoute,
})

function TestPracticeRoute() {

	const { testId } = Route.useParams();
	const { selectedAnswers, selectedPartIds, timeLimit, type } = Route.useSearch();
	const { data: testData, isLoading, error } = useGetTestDetail(Number(testId), selectedPartIds);

	if (isLoading) return <div className="text-center text-foreground">Loading...</div>;
	if (error) return <div className="text-center text-destructive">Error: {error.message}</div>;


	// Filter parts based on selectedPartIds, then sort the media_ques_list
	const sortedParts = testData!.part_list
		.filter((part) => selectedPartIds.includes(part.part_id))
		.map((part) => ({
			...part,
			media_ques_list: part.media_ques_list ? mediaQuestionSorter(part.media_ques_list) : []
		}))

	const initialActive = (() => {
		const part = sortedParts[0]
		const questionId = part?.media_ques_list?.[0]?.ques_list?.[0]?.ques_id ?? 0
		return { part_id: part?.part_id ?? 0, question_id: questionId }
	})()

	const initialState: TestState = {
		testId: Number(testId),
		testType: type,
		activePart: initialActive.part_id,
		activeQuestion: initialActive,
		selectedAnswers: selectedAnswers ?? {},
		selectedParts: type === "Practice" ? selectedPartIds.map(String) : [],
		remainingDuration: timeLimit,
	}

	return (
		<TestProvider initialState={initialState}>
			<TestScrollProvider>
				<TestPracticePage
					testId={Number(testId)}
					testTitle={"TMA TOEIC TEST"} // testData!.test_title || 
					partData={sortedParts}
				/>
			</TestScrollProvider>
		</TestProvider>
	)
}
