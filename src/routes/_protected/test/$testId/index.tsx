
import { historyQuery } from '@/feature/history/service/historyService';
import TestSetupSkeleton from '@/feature/test/loading/TestSetupSkeleton';
import TestSetupPage from '@/feature/test/page/TestSetupPage';
import { testQuery } from '@/feature/test/service/testService';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/test/$testId/')({
	component: TestSetupRoute,
	pendingComponent: TestSetupSkeleton,
})

function TestSetupRoute() {
	const { testId } = Route.useParams();

	const { data: testData } = useSuspenseQuery(testQuery.all());
	const { data: historyData } = useSuspenseQuery(historyQuery.saveProgress(Number(testId)));

	const currentTest = testData.find(test => test.test_id === Number(testId));

	return (
		<div className="h-screen">
			<TestSetupPage
				currentTest={currentTest!}
				saveHistoryData={historyData} />
		</div>
	)
}
