import { createFileRoute } from '@tanstack/react-router'
import { TestDashBoardPage } from '@/feature/test/page/TestDashBoardPage'
import TestDashBoardSkeleton from '@/feature/test/loading/TestDashBoardSkeleton'
import { useQueries, useSuspenseQuery } from '@tanstack/react-query'
import { testQuery } from '@/feature/test/service/testService'
import { historyQuery } from '@/feature/history/service/historyService'

export const Route = createFileRoute('/_protected/test/')({
	component: TestDashBoardRoute,
	pendingComponent: TestDashBoardSkeleton,
})

function TestDashBoardRoute() {
	const { data: testData } = useSuspenseQuery(testQuery.all())
	const { data: historyList } = useSuspenseQuery(historyQuery.resultList())

	const hasHistory = historyList && historyList.length > 0;

	// Fetch saved progress for all tests at once
	// useQueries for parallel queries
	const savedProgressQueries = useQueries({
		queries: testData.map((test) => ({
			...historyQuery.saveProgress(test.test_id),
		})),
	});

	// Create a map of { testId : hasSavedProgress }
	const savedProgressMap = testData.reduce((progressMap, test, index) => {
		const data = savedProgressQueries[index]?.data;
		progressMap[test.test_id] = data !== undefined && data !== null;
		return progressMap;
	}, {} as Record<number, boolean>);

	return (
		<div className="min-h-screen container mx-auto p-6">
			<TestDashBoardPage
				testData={testData}
				hasHistory={hasHistory}
				savedProgressMap={savedProgressMap}
			/>
		</div>
	)
}