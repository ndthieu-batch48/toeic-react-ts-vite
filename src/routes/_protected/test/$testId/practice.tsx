import TestPracticeSkeleton from '@/feature/test/loading/TestPracticeSkeleton';
import { TEST_TYPE } from '@/feature/test/const/testConst';
import { TestProvider, type TestState } from '@/feature/test/context/TestContext';
import { TestScrollProvider } from '@/feature/test/context/TestScrollContext';
import { mediaQuestionSorter } from '@/feature/test/helper/testHelper';
import { TestPracticePage } from '@/feature/test/page/TestPracticePage';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';
import { testQuery } from '@/feature/test/service/testService';
import { historyQuery } from '@/feature/history/service/historyService';
import type { TestDetailRes } from '@/feature/test/type/testType';
import type { HistoryResp } from '@/feature/history/type/historyType';

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
	pendingComponent: TestPracticeSkeleton,

	// loaderDeps function load data from search params and RETURN to loader function
	loaderDeps: ({ search }) => ({
		shouldContinue: search.isContinue
	}),

	loader: ({ context, params, deps }) => {
		const testId = Number(params.testId);

		const promises: Promise<TestDetailRes | HistoryResp>[] = [
			// Always fetch test data
			context.queryClient.ensureQueryData(testQuery.byId(testId)),
		];

		if (deps.shouldContinue) {
			promises.push(
				// Only fetch saved history progress IF shouldContinue is true
				context.queryClient.ensureQueryData(historyQuery.saveProgress(testId))
			);
		}

		Promise.all(promises);

	},
})

function TestPracticeRoute() {
	const { testId } = Route.useParams();
	const { testTitle, type, selectedPartIds, timeLimit, isContinue } = Route.useSearch();

	const testIdParam = Number(testId);
	const shouldContinueTest = isContinue ?? false

	const { data: testData } = useSuspenseQuery(testQuery.byId(testIdParam));
	const { data: historyData } = useQuery({
		...historyQuery.saveProgress(testIdParam),
		enabled: shouldContinueTest,
	});


	if (!testData) return null;

	const setup = {
		partIdList: historyData?.part_id_list.map(Number) ?? selectedPartIds,
		answerMap: historyData?.dataprog ?? {},
		duration: historyData?.dura ?? timeLimit,
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
			media_ques_list: part.media_ques_list ? mediaQuestionSorter(part.media_ques_list) : [],
		}));


	const firstPart = sortedPartList[0];
	const firstQuestion = firstPart?.media_ques_list?.[0]?.ques_list?.[0];
	const initialActive = {
		part_id: firstPart?.part_id ?? 0,
		question_id: firstQuestion?.ques_id ?? 0,
	};

	const initialState: TestState = {
		testId: testIdParam,
		testType: type,
		activePart: initialActive.part_id,
		activeQuestion: initialActive,
		selectedParts: setup.partIdList?.map(String) ?? [],
		selectedAnswers: setup.answerMap,
		remainingDuration: setup.duration,
	}

	return (
		<TestProvider initialState={initialState}>
			<TestScrollProvider>
				<TestPracticePage
					testId={testIdParam}
					testTitle={testTitle || "TOEIC English practice"}
					partData={sortedPartList}
				/>
			</TestScrollProvider>
		</TestProvider>
	)
}