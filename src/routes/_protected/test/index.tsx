import { createFileRoute } from '@tanstack/react-router'
import { useGetAllTests } from '@/features/tests/hooks/userTestApi'
import { useGetHistoryResultList } from '@/features/history/hooks/useHistoryApi'
import { TestDashBoardPage } from '@/features/tests/pages/TestDashBoardPage'

export const Route = createFileRoute('/_protected/test/')({
	component: TestDashBoardRoute,
})

function TestDashBoardRoute() {
	const {
		status: testsStatus,
		data: testData,
		isError: isTestsError,
		error: testsError,
	} = useGetAllTests()

	const {
		status: historyStatus,
		data: historyData,
		isError: isHistoryError,
		error: historyError,
	} = useGetHistoryResultList()

	if (testsStatus === 'pending' || historyStatus === 'pending') {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center text-foreground">Loading...</div>
			</div>
		)
	}

	if (isTestsError) {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center text-destructive">
					Error loading tests: {testsError?.message}
				</div>
			</div>
		)
	}

	if (isHistoryError) {
		return (
			<div className="container mx-auto p-6">
				<div className="text-center text-destructive">
					Error loading history: {historyError?.message}
				</div>
			</div>
		)
	}

	return (
		<TestDashBoardPage testData={testData} historyData={historyData} />
	)
}