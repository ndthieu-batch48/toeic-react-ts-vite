import { saveHistoryProgOption } from '@/feature/history/query/historyQuery';
import { TEST_TYPE } from '@/feature/test/const/testConst';
import { TestProvider, type TestState } from '@/feature/test/context/TestContext';
import { TestScrollProvider } from '@/feature/test/context/TestScrollContext';
import { mediaQuestionSorter } from '@/feature/test/helper/testHelper';
import { TestPracticePage } from '@/feature/test/page/TestPracticePage';
import { testDetailOption } from '@/feature/test/query/testQuery';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';

const searchSchema = z.object({
	testTitle: z.string(),
	type: z.enum(TEST_TYPE),
	selectedPartIds: z.array(z.number()).optional(),
	timeLimit: z.number(),
	isContinue: z.boolean().optional(),
})

export const Route = createFileRoute('/_protected/test/$testId/practice')({

	validateSearch: searchSchema,
	component: TestPracticeRoute,

	// loaderDeps function load data from search params and return to loader function
	loaderDeps: ({ search }) => {
		const { isContinue: continueTest } = search
		return { continueTest }
	},

	loader: async ({ context, params, deps }) => {
		const testId = Number(params.testId);

		// Always prefetch test data
		await context.queryClient.prefetchQuery(testDetailOption(testId));

		// Only prefetch history for if continue flag is passed
		if (deps.continueTest) {
			await context.queryClient.prefetchQuery(saveHistoryProgOption(testId));
		}
	},
})

function TestPracticeRoute() {
	const { testId } = Route.useParams();
	const { testTitle, type, selectedPartIds, timeLimit, isContinue: shouldContinueTest } = Route.useSearch();

	// Fetch test data with regular useQuery
	const { data: testData, isLoading: isTestLoading, error: testError } = useQuery(
		testDetailOption(Number(testId))
	);

	const { data: historyData, isLoading: isHistoryLoading } = useQuery({
		...saveHistoryProgOption(Number(testId)),
		enabled: shouldContinueTest,
	});

	// Show loading state
	if (isTestLoading || (shouldContinueTest && isHistoryLoading)) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="text-lg font-semibold">Loading test data...</div>
					<div className="text-sm text-muted-foreground mt-2">Please wait</div>
				</div>
			</div>
		);
	}

	// Show error state
	if (testError) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center text-destructive">
					<div className="text-lg font-semibold">Error loading test</div>
					<div className="text-sm mt-2">{testError.message}</div>
				</div>
			</div>
		);
	}

	if (!testData) return null;

	// Determine parts and answers based on whether we're continuing from history
	const partIds = shouldContinueTest && historyData
		? historyData.part_id_list.map(Number)
		: selectedPartIds;

	const savedAnswers = shouldContinueTest && historyData
		? historyData.dataprog
		: {};

	const duration = shouldContinueTest && historyData
		? historyData.dura
		: timeLimit;

	// Sort and filter parts
	const sortedParts = testData.part_list
		.filter((part) => {
			// In Exam mode include all parts
			if (!partIds || partIds.length === 0) {
				return true;
			}
			// In Practice mode filter by partIds
			return partIds.includes(part.part_id);
		})
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
		selectedAnswers: savedAnswers,
		selectedParts: partIds ? partIds.map(String) : [],
		remainingDuration: duration,
	}

	return (
		<TestProvider initialState={initialState}>
			<TestScrollProvider>
				<TestPracticePage
					testId={Number(testId)}
					testTitle={testTitle || "TOEIC English practice"}
					partData={sortedParts}
				/>
			</TestScrollProvider>
		</TestProvider>
	)
}