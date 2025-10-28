import { saveHistoryProgOption } from '@/feature/history/query/historyQuery';
import { useGetAllTests } from '@/feature/test/hook/useTestApi';
import TestSetupSkeleton from '@/feature/test/loading/TestSetupSkeleton';
import TestSetupPage from '@/feature/test/page/TestSetupPage';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/test/$testId/')({
	component: TestSetupRoute,
})

function TestSetupRoute() {
	const { testId } = Route.useParams();

	const { status, data, isError, error } = useGetAllTests();
	const { data: historyData } = useQuery(saveHistoryProgOption(Number(testId)));

	if (status === 'pending') {
		return (
			<TestSetupSkeleton />
		)
	}

	if (isError) {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center text-destructive">
					Error loading tests: {error?.message}
				</div>
			</div>
		)
	}

	const currentTest = data.find(test => test.test_id === Number(testId));

	return (
		<>
			<TestSetupPage
				currentTest={currentTest!}
				saveHistoryData={historyData} />
		</>
	)
}
