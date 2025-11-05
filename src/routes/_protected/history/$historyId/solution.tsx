import { SolutionPage } from '@/feature/history/page/SolutionPage';
import { SolutionProvider, type SolutionState } from '@/feature/history/context/SolutionContext';
import { SolutionScrollProvider } from '@/feature/history/context/SolutionScrollContext';
import { mediaQuestionSorter } from '@/feature/test/helper/testHelper';
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { historyQuery } from '@/feature/history/service/historyService';
import { testQuery } from '@/feature/test/service/testService';
import SolutionPageSkeleton from '@/feature/history/loading/SolutionPageSkeleton';

const searchSchema = z.object({
	testId: z.number(),

})
export const Route = createFileRoute('/_protected/history/$historyId/solution')({
	validateSearch: searchSchema,
	component: SolutionRoute,
	pendingComponent: SolutionPageSkeleton,

	loaderDeps: ({ search }) => ({
		testId: search.testId
	}),

	loader: ({ context, params, deps }) => {
		const testId = Number(deps.testId);
		const historyId = Number(params.historyId)

		const promises = [
			context.queryClient.ensureQueryData(testQuery.byId(testId)),
			context.queryClient.ensureQueryData(historyQuery.resultDetail(Number(historyId)))
		];

		Promise.all(promises);

	},
})

function SolutionRoute() {
	const { historyId } = Route.useParams();
	const { testId } = Route.useSearch();

	const historyIdParam = Number(historyId)

	const { data: historyData } = useSuspenseQuery(historyQuery.resultDetail(historyIdParam));
	const { data: testData } = useSuspenseQuery(testQuery.byId(testId));

	if (!testData) return null;

	const historySetup = {
		partIdList: historyData?.part_id_list.map(Number),
		answerMap: historyData?.dataprog,
	};

	const sortedPartList = testData.part_list
		.filter((part) => {
			if (!historySetup.partIdList || historySetup.partIdList.length === 0) {
				return true;
			}
			return historySetup.partIdList.includes(part.part_id);
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

	const initialState: SolutionState = {
		testId: historyData.test_id,
		activePart: initialActive.part_id,
		activeQuestion: initialActive,
		selectedAnswers: historyData.dataprog ?? {},
		selectedParts: [],
	}

	return (
		<SolutionProvider initialState={initialState}>
			<SolutionScrollProvider>
				<SolutionPage
					detailHistory={historyData}
					partData={sortedPartList}
					testTitle={historyData.test_name || "TOEIC English practice"}
				/>
			</SolutionScrollProvider>
		</SolutionProvider>
	)
}
