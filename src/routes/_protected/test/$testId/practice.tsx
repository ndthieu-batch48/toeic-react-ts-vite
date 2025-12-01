import TestPracticeSkeleton from '@/feature/test/loading/TestPracticeSkeleton';
import { TEST_TYPE } from '@/feature/test/const/testConst';
import { TestProvider, type TestState } from '@/feature/test/context/TestContext';
import { TestScrollProvider } from '@/feature/test/context/TestScrollContext';
import { mediaQuestionSorter, getPracticeDuration } from '@/feature/test/helper/testHelper';
import { TestPracticePage } from '@/feature/test/page/TestPracticePage';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';
import { testQuery } from '@/feature/test/service/testService';
import { historyQuery } from '@/feature/history/service/historyService';

const searchSchema = z.object({
	testTitle: z.string(),
	type: z.enum(TEST_TYPE),
	selectedPartIds: z.array(z.number()).optional(),
	timeLimit: z.number(),
	isContinue: z.boolean(),
})

export const Route = createFileRoute('/_protected/test/$testId/practice')({
	validateSearch: searchSchema,
	component: TestPracticeRoute,
	pendingComponent: TestPracticeSkeleton,

	// loaderDeps function load data from search params and RETURN to loader function
	loaderDeps: ({ search }) => ({
		shouldContinue: search.isContinue
	}),

	loader: ({ context, params }) => {
		const testId = Number(params.testId);

		// Always fetch test data
		context.queryClient.ensureQueryData(testQuery.byId(testId));

		// Always fetch saved history progress (needed for reload scenarios)
		context.queryClient.ensureQueryData(historyQuery.saveProgress(testId));
	},
})

function TestPracticeRoute() {
	const { testId } = Route.useParams();
	const { testTitle, type, selectedPartIds, timeLimit, isContinue } = Route.useSearch();

	const testIdParam = Number(testId);

	const { data: testData } = useSuspenseQuery(testQuery.byId(testIdParam));
	const { data: historyData } = useSuspenseQuery(historyQuery.saveProgress(testIdParam),);

	const testDataFromHistory = isContinue ? historyData : undefined;

	if (!testData) return null;

	const setup = {
		partIdList: testDataFromHistory?.part_id_list.map(Number) ?? selectedPartIds,
		answerMap: testDataFromHistory?.data_progress ?? {},
		duration: testDataFromHistory?.practice_duration ?? timeLimit,
		savedPracticeDuration: getPracticeDuration(testIdParam),
	};

	const sortedPartList = testData.part_list
		.filter((part) => {
			// Exam mode: include all parts
			if (!setup.partIdList || setup.partIdList.length === 0) {
				return true;
			}
			// Practice mode: filter by selected parts
			return setup.partIdList.includes(part.part_id);
		})
		.map((part) => ({
			...part,
			media_question_list: part.media_question_list ? mediaQuestionSorter(part.media_question_list) : [],
		}));


	const firstPart = sortedPartList[0];
	const firstQuestion = firstPart?.media_question_list?.[0]?.question_list?.[0];
	const initialActive = {
		part_id: firstPart?.part_id ?? 0,
		question_id: firstQuestion?.question_id ?? 0,
	};

	const initialState: TestState = {
		testId: testIdParam,
		testType: type,
		activePart: initialActive.part_id,
		activeQuestion: initialActive,
		selectedParts: setup.partIdList?.map(String) ?? [],
		selectedAnswers: setup.answerMap,
		practiceDuration: setup.savedPracticeDuration, // Restore from saved duration
		examDuration: setup.duration * 60, // Convert minutes to seconds for exam mode (count down)
		isSubmitting: false,
		isSaving: false,
		isClosing: false
	}

	return (
		<TestProvider initialState={initialState}>
			<TestScrollProvider>
				<TestPracticePage
					testTitle={testTitle || "TOEIC English practice"}
					partData={sortedPartList}
				/>
			</TestScrollProvider>
		</TestProvider>
	)
}