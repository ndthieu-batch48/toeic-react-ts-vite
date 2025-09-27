import { useGetSaveHistoryProgress } from '@/features/history/hooks/useHistoryApi';
import { useGetAllTests } from '@/features/tests/hooks/userTestApi';
import TestSetupPage from '@/features/tests/pages/TestSetupPage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/test/$testId/')({
	component: TestSetupRoute,
})

function TestSetupRoute() {
	const { testId } = Route.useParams();

	const { status, data, isError, error } = useGetAllTests();
	const { data: historyData } = useGetSaveHistoryProgress(Number(testId));


	if (status === 'pending') {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center text-foreground">Loading tests...</div>
			</div>
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
